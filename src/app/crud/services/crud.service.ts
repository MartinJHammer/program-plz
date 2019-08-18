import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, SubscriptionLike, combineLatest } from 'rxjs';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/firestore';
import { throttleTime, mergeMap, tap, map, scan } from 'rxjs/operators';
import { Entry } from 'src/app/start/models/entry';

@Injectable({ providedIn: 'root' })
export class CrudService<T> {
    private collectionName: string;
    private deleting$ = new BehaviorSubject(undefined);
    private query$: Observable<QuerySnapshot<any>>;
    private entries$ = new BehaviorSubject([]);  // Entries are updated via next()
    private querySub$: SubscriptionLike;
    private batchSize = 10;
    private filters: any = {};
    private offset$ = new BehaviorSubject(null);
    private collectionEnd = false;

    constructor(
        public afs: AngularFirestore
    ) { }

    /**
     * Inits necessary logic and returns the entries stream.
     */
    public getEntries(collectionName: string): Observable<Entry[]> {
        this.collectionName = collectionName;
        this.generateQuery();
        this.executeQuery();
        return this.deleteStream();
    }

    /**
     * Updates the deleting$ stream with the entity to delete
     * Flow together with current local entries and filters it away
     */
    public removeFromEntries$(entry: Entry): void {
        this.deleting$.next(entry);
    }

    /**
     * Sets filters needed for the query.
     */
    public setFilters(filterName: any, filter: any): CrudService<T> {
        this.filters[filterName] = filter;
        return this;
    }

    /**
     * Generates and executes a new db query with set filters.
     * Updates entries$
     */
    public runFilters(): void {
        this.generateQuery();
        this.executeQuery();
    }

    /**
     * Gets the next batch of entries, unless no more entries are available.
     */
    public nextBatch(offset: string, end: number, total: number): void {
        if (this.collectionEnd) {
            return;
        }

        if (end === total) {
            // When this is updated, the current query$ runs again with same
            // filters etc., but with the updated offset.
            this.offset$.next(offset);
        }
    }

    /**
     * Generates the collection query to be executed - with filters if any
     */
    private generateQuery() {
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
    private executeQuery() {
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

    /**
     * Inits a stream that removes the passed entry in deleting$ from the entries$ stream
     */
    private deleteStream(): Observable<Entry[]> {
        return combineLatest(
            this.deleting$,
            this.entries$
        ).pipe(
            map(([deleting, entries]) => entries.filter(x => x.id !== (deleting && deleting.id)))
        );
    }
}