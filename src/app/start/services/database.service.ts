import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference, QuerySnapshot } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, SubscriptionLike, combineLatest } from 'rxjs';
import { tap, throttleTime, mergeMap, scan, map } from 'rxjs/operators';
import { docsMap } from '../helpers/docs-map';
import { docMap } from '../helpers/doc-map';
import { snapshotChangesDocsMap } from '../helpers/snapshot-changes-docs-map';
import { Entry } from '../models/entry';

@Injectable({ providedIn: 'root' })
export class DatabaseService<T> {
    public offset$ = new BehaviorSubject(null);
    private collectionName: string;
    private lastVisible: any;
    private deleting$ = new BehaviorSubject(undefined);
    private query$: Observable<QuerySnapshot<any>>;
    private entries$ = new BehaviorSubject([]);  // Entries are updated via next()
    private querySub$: SubscriptionLike;  // Not db related!!
    private batchSize = 10;  // Not db related!!
    public collectionEnd = false; // Not db related!!
    private filters: any = {};

    constructor(
        public afs: AngularFirestore
    ) { }

    public get(path: string): Observable<T[]> {
        return this.afs.collection(path, ref => ref.orderBy('name').startAt(this.lastVisible ? this.lastVisible : 0).limit(10)).get().pipe(
            tap(docs => this.lastVisible = docs.docs[docs.docs.length - 1]),
            docsMap
        );
    }

    public getAll(path: string): Observable<T[]> {
        return this.afs.collection<T>(path).snapshotChanges().pipe(snapshotChangesDocsMap);
    }

    public getSingle(path: string, id: string): Observable<T> {
        return this.afs.doc<T>(`${path}/${id}`).get().pipe(docMap);
    }

    public add(path: string, entity: T): Promise<DocumentReference> {
        return this.afs.collection<T>(path).add(entity);
    }

    public update(path: string, entity: T): Promise<void> {
        return this.afs.doc(path).update(entity);
    }

    public delete(path: string): Promise<void> {
        return this.afs.doc(path).delete();
    }

    public setFilters(filterName: any, filter: any): DatabaseService<T> {
        this.filters[filterName] = filter;
        return this;
    }

    public runFilters(): void {
        this.generateQuery();
        this.executeQuery();
    }

    /**
     * Generates the collection query to be executed - with filters if any
     */
    public generateQuery() {
        // Reset: Unsubscribe the current list
        if (this.querySub$) {
            this.querySub$.unsubscribe();
            this.query$ = undefined;
        }

        // Reset: Empty the list
        this.entries$.next([]);

        // Reset: relevant streams
        const throttledOffset$ = this.offset$.pipe(throttleTime(500));
        this.offset$.next(null);
        this.deleting$.next(undefined);

        // New query w. filters if any
        if (this.filters.filterNoExerciseType) {
            // Current filters - Hardcoded... These needs to be provided.
            this.query$ = throttledOffset$.pipe(
                mergeMap(offset =>
                    this.afs.collection(this.collectionName, ref => ref
                        .where('exerciseTypeId', '==', null)
                        .orderBy('name')
                        .startAfter(offset)
                        .limit(this.batchSize))
                        .get()
                )
            );
        } else {
            // No filters. Get collection sorted by name asc
            this.query$ = throttledOffset$.pipe(
                mergeMap(offset =>
                    this.afs.collection(this.collectionName, ref => ref
                        .orderBy('name')
                        .startAfter(offset)
                        .limit(this.batchSize))
                        .get()
                ),
            );
        }
    }

    /**
     * Executes the query generated in generateQuery
     */
    public executeQuery() {
        this.querySub$ = this.query$.pipe(
            tap(snapShot => (snapShot.docs.length ? null : (this.collectionEnd = true))),
            map(snapShot => snapShot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))),
            scan((acc, batch) => [...acc, ...batch], []), // merge all batches together
            map(entries => this.entries$.next(entries)),
        ).subscribe();
    }

    // Not db related!!
    public getEntries(collectionName: string): Observable<Entry[]> {
        this.collectionName = collectionName;
        this.generateQuery();
        this.executeQuery();
        return this.deleteStream();
    }

    // Not db related!!!
    public deleteFromLocalList(entry: Entry): void {
        this.deleting$.next(entry);
    }

    /**
     * Inits a stream that removes the passed entry in deleting$ from the entries$ stream
     */
    // Not db related!!!
    public deleteStream(): Observable<Entry[]> {
        return combineLatest(
            this.deleting$,
            this.entries$
        ).pipe(
            map(([deleting, entries]) => entries.filter(x => x.id !== (deleting && deleting.id)))
        );
    }

    // Incomment when needed.
    // public removeFieldValue(path: string, field: string): Promise<void> {
    //     const remove = {};
    //     remove[field] = FieldValue.delete();
    //     return this.afs.doc(path).update(remove);
    // }
}
