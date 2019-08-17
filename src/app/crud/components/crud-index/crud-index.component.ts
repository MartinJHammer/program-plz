import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, SubscriptionLike, combineLatest } from 'rxjs';
import { map, tap, throttleTime, mergeMap, scan } from 'rxjs/operators';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/ui/components/dialog/dialog.component';
import { SubscriptionHandler } from 'src/app/start/helpers/subscription-handler';
import { Entry } from 'src/app/start/models/entry';

@Component({
  selector: 'pp-crud-index',
  templateUrl: './crud-index.component.html',
  styleUrls: ['./crud-index.component.scss']
})
export class CrudIndexComponent implements OnInit, OnDestroy {
  @Input() public collectionName: string;
  @Input() public identifier: string;
  @Input() public searchEnabled = false;
  public entries$ = new BehaviorSubject([]);  // Entries are updated via next()
  public filterNoExerciseType = false; // Use this filter? Current hardcoded - needs to be removed
  public showActions: boolean;

  //#region Entries (data, infinite scroll, pagination, etc.)

  // The viewport - Used to check if we need to load more data
  @ViewChild(CdkVirtualScrollViewport) public viewport: CdkVirtualScrollViewport;

  // The query to be exected against the db
  private query$: Observable<QuerySnapshot<any>>;

  // The subscript
  private querySub$: SubscriptionLike;

  // Whether we have loaded all data
  private collectionEnd = false;

  // Current point in the data list
  private offset$ = new BehaviorSubject(null);

  // Amount of data pr. request
  public batchSize = 10;

  //#endregion

  //#region Utility
  private deleting$ = new BehaviorSubject(undefined);
  private subscriptionHandler = new SubscriptionHandler();
  //#endregion

  constructor(
    public afs: AngularFirestore,
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.generateQuery();
    this.initDeleteStream();
  }

  ngOnDestroy(): void {
    this.subscriptionHandler.unsubscribe();
  }



  public toggleActions() {
    this.showActions = !this.showActions;
  }

  /**
   * Generates the collection query to be executed - with filters if any
   */
  public generateQuery() {
    // Reset: Unsubscribe the current list
    this.querySub$ ? this.querySub$.unsubscribe() : this.query$ = undefined;

    // Reset: Empty the list
    this.entries$.next([]);

    // Reset: relevant streams
    const throttledOffset$ = this.offset$.pipe(throttleTime(500));
    this.offset$.next(null);
    this.deleting$.next(undefined);

    // New query w. filters if any
    if (this.filterNoExerciseType) {
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
        )
      );
    }

    // Execute the final query.
    this.executeQuery();
  }

  /**
   * Routes to the selected hit (edit)
   */
  public routeToHit(hit: any) {
    this.router.navigate([`${this.collectionName}/edit`, hit.id]);
  }

  /**
   * Used in the html to request next batch.
   */
  public nextBatch(offset: string): void {
    if (this.collectionEnd) {
      return;
    }

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();

    if (end === total) {
      this.offset$.next(offset);
    }
  }

  public trackById(item: Entry): string {
    return item.id;
  }

  public delete(selectedEntry: Entry): void {
    this.dialog.open(DialogComponent, {
      minWidth: '250px',
      data: {
        title: `Are you sure you want to remove ${selectedEntry[this.identifier]}`,
        body: 'This cannot be undone.',
        logic: () => {
          // Delete from db
          this.afs.doc(`${this.collectionName}/${selectedEntry.id}`).delete();

          // Delete locally
          this.deleting$.next(selectedEntry);
        }
      }
    } as MatDialogConfig);
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
      })
      )),
      scan((acc, batch) => [...acc, ...batch], []), // merge all batches together
      map(entries => this.entries$.next(entries)),
    ).subscribe();
  }

  /**
   * Inits a stream that removes the passed entry in deleting$ from the entries$ stream
   */
  private initDeleteStream(): void {
    this.subscriptionHandler.register(combineLatest(
      this.deleting$,
      this.entries$
    ).pipe(
      tap(([deleting, entries]) => this.entries$.next(entries.filter(x => x.id !== (deleting && deleting.id))))
    ).subscribe());
  }
}
