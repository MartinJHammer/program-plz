import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { snapshotChangesDocsMap } from '../helpers/snapshot-changes-docs-map';
import { docMap } from '../helpers/doc-map';
import { StorageService } from './storage.service';
import { take, tap, flatMap, filter, map, switchMap } from 'rxjs/operators';
import { Entry } from '../models/entry';
import { AuthService } from './auth.service';
import { User } from '../models/user';

export abstract class DataService<T extends Entry> {
    public get collection(): string {
        return this.collectionPath;
    }

    protected entries$ = new BehaviorSubject<T[]>([]);

    constructor(
        protected afs: AngularFirestore,
        protected storageService: StorageService,
        protected authService: AuthService,
        protected collectionPath: string,
    ) {
        this.loadData();
    }

    public getAll(): Observable<T[]> {
        // Refactor this to get hash-ish value to check if anything has changed
        // before fetching? Unless no local data, then always fetch.
        this.afs.collection<T>(this.collectionPath).snapshotChanges().pipe(
            snapshotChangesDocsMap,
            tap(entries => this.updateEntries(entries)),
            take(1)
        ).subscribe();

        return this.entries$.pipe(map(entries => [...entries].sort((a, b) => (a.name > b.name) ? 1 : -1)));
    }

    public getSingle(id: string): Observable<T> {
        this.afs.doc<T>(`${this.collectionPath}/${id}`).get().pipe(
            docMap,
            tap(entry => this.updateSingleEntryInEntries(entry)),
            take(1)
        ).subscribe();

        return this.entries$.pipe(
            flatMap(x => x),
            filter(entry => entry.id === id),
        );
    }

    public add(entry: T): void {
        this.withUser(user => {
            entry.userId = user.uid;
            const currentEntries = this.entries$.getValue();
            return from(this.afs.collection<T>(this.collectionPath).add(Object.assign({}, entry)).then(docRef => {
                entry.id = docRef.id;
                this.updateEntries([entry, ...currentEntries]);
            }));
        }).pipe(take(1)).subscribe();
    }

    public update(entry: T): void {
        this.afs.doc(`${this.collectionPath}/${entry.id}`).update(entry).then(() => this.updateSingleEntryInEntries(entry));
    }

    public delete(id: string): void {
        this.afs.doc(`${this.collectionPath}/${id}`).delete().then(() => {
            this.updateEntries(
                this.entries$.getValue().filter(entry => entry.id !== id)
            );
        });
    }

    protected updateEntries(entries: T[]) {
        this.entries$.next(entries);
        this.storageService.set(this.collectionPath, entries);
    }

    protected withUser(logic: (user: User) => Observable<any>): Observable<any> {
        return this.authService.user.pipe(
            filter(user => !!user),
            switchMap(user => logic(user))
        );
    }

    private updateSingleEntryInEntries(entry: T) {
        const currentEntries = [...this.entries$.getValue()];
        const index = currentEntries.findIndex(currentEntry => currentEntry.id === entry.id);
        if (index !== -1) {
            currentEntries.splice(index, 1, entry);
        }

        this.updateEntries(currentEntries);
    }

    private loadData() {
        this.storageService.select(this.collectionPath).pipe(
            take(1),
            tap((entries: T[]) => {
                if (!entries || (entries && entries.length === 0)) {
                    this.getAll();
                }
                this.entries$.next(entries ? entries : []);
            })
        ).subscribe();
    }
}
