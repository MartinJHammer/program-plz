import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { snapshotChangesDocsMap } from '../helpers/snapshot-changes-docs-map';
import { docMap } from '../helpers/doc-map';
import { StorageService } from './storage.service';
import { take, tap, flatMap, filter } from 'rxjs/operators';
import { Entry } from '../models/entry';

export abstract class DataService<T extends Entry> {
    public get collection(): string {
        return this.collectionPath;
    }

    protected entries$ = new BehaviorSubject<T[]>([]);

    constructor(
        protected afs: AngularFirestore,
        protected storageService: StorageService,
        protected collectionPath: string
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

        return this.entries$;
    }

    public getSingle(id: string): Observable<T> {
        // Get current values
        const currentEntries = this.entries$.getValue();

        // Only fetch the entry if it isn't in the local stream.
        if (currentEntries.some(currentEntry => currentEntry.id !== id)) {
            this.afs.doc<T>(`${this.collectionPath}/${id}`).get().pipe(
                docMap,
                tap(entry => this.updateEntries([...currentEntries, entry])),
                take(1)
            ).subscribe();
        }

        return this.entries$.pipe(flatMap(x => x), filter(entry => entry.id === id));
    }

    public add(entry: T): void {
        this.afs.collection<T>(this.collectionPath).add(entry).then(docRef => {
            entry.id = docRef.id;
            const currentEntries = this.entries$.getValue();
            this.updateEntries([entry, ...currentEntries]);
        });
    }

    public update(entry: T): void {
        this.afs.doc(this.collectionPath).update(entry).then(() => {
            const currentEntries = this.entries$.getValue().map(x => x);
            const index = currentEntries.findIndex(currentEntry => currentEntry.id !== entry.id);
            if (index && index !== -1) {
                currentEntries[index] = entry;
            }

            this.updateEntries(currentEntries);
        });
    }

    public delete(id: string): void {
        this.afs.doc(`${this.collectionPath}/${id}`).delete().then(() => {
            this.updateEntries(
                this.entries$.getValue().filter(entry => entry.id !== id)
            );
        });
    }

    private updateEntries(entries: T[]) {
        this.entries$.next(entries);
        this.storageService.set(this.collectionPath, entries);
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
