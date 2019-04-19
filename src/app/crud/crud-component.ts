import { OnInit, ViewChild } from '@angular/core';
import { CrudService } from './crud.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, throttleTime, mergeMap, scan } from 'rxjs/operators';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AngularFirestore } from '@angular/fire/firestore';

export class CrudComponent implements OnInit {
    // Infinite
    @ViewChild(CdkVirtualScrollViewport) public viewport: CdkVirtualScrollViewport;
    public collectionEnd = false;
    public offset = new BehaviorSubject(null);
    public entries$: Observable<any>;
    public batchSize = 10;


    constructor(
        public crudService: CrudService,
        public afs: AngularFirestore,
    ) { }

    ngOnInit(): void {
        this.initList();
    }

    /**
     * Initial stream that listens to offset, and merges in new values.
     */
    public initList(): void {
        this.entries$ = this.offset.pipe(
            throttleTime(500), // prevent sending redundant requests
            mergeMap(lastSeen => this.afs.collection('exercises', ref => ref.orderBy('name').startAfter(lastSeen).limit(this.batchSize)).snapshotChanges().pipe(
                tap(arr => (arr.length ? null : (this.collectionEnd = true))),
                map(arr => {
                    return arr.reduce((acc, cur) => {
                        const id = cur.payload.doc.id;
                        const data = cur.payload.doc.data();
                        return { ...acc, [id]: data };
                    }, {});
                })
            )), // Used over switchMap to keep real time
            scan((acc, batch) => { // merge all batches together
                return { ...acc, ...batch };
            }, {}),
            map(x => Object.values(x)) // Turn into array of values
        );
    }


    /**
     * Used in the html to request next batch.
     */
    public nextBatch(event: any, offset: string): void {
        if (this.collectionEnd) {
            return;
        }

        const end = this.viewport.getRenderedRange().end;
        const total = this.viewport.getDataLength();

        if (end === total) {
            this.offset.next(offset);
        }
    }

    public trackByIndex(index: number): number {
        return index;
    }
}
