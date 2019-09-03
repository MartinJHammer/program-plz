import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { snapshotChangesDocsMap } from '../helpers/snapshot-changes-docs-map';
import { docMap } from '../helpers/doc-map';
import { StorageService } from './storage.service';
import { take, tap, flatMap, filter, map } from 'rxjs/operators';
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
        const currentEntries = this.entries$.getValue();
        this.afs.collection<T>(this.collectionPath).add(entry).then(docRef => {
            entry.id = docRef.id;
            this.updateEntries([entry, ...currentEntries]);
        });
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

    private updateEntries(entries: T[]) {
        this.entries$.next(entries);
        this.storageService.set(this.collectionPath, entries);
    }

    private updateSingleEntryInEntries(entry: T) {
        const currentEntries = [...this.entries$.getValue()];
        const index = currentEntries.findIndex(currentEntry => currentEntry.id === entry.id);
        if (index !== -1) {
            currentEntries.splice(index, 1, entry);
        }

        this.updateEntries(currentEntries);
    }
}
