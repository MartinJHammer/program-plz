import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Entry } from 'src/app/models/entry';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, SubscriptionLike } from 'rxjs';
import { map, tap, throttleTime, mergeMap, scan, switchMap } from 'rxjs/operators';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { SubscriptionHandler } from 'src/app/helpers/subscription-handler';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'pp-crud-index',
  templateUrl: './crud-index.component.html',
  styleUrls: ['./crud-index.component.scss']
})
export class CrudIndexComponent implements OnInit, OnDestroy {
  // Infinite scroll
  @ViewChild(CdkVirtualScrollViewport) public viewport: CdkVirtualScrollViewport;
  public collectionEnd = false;
  public offset = new BehaviorSubject(null);
  public batchSize = 10;
  public entries$ = new BehaviorSubject([]);
  public deleting$ = new BehaviorSubject(undefined);
  public query$: Observable<QuerySnapshot<any>>;
  public querySub$: SubscriptionLike;
  public filterNoExerciseType = false;

  @Input() public collectionName: string;
  @Input() public identifier: string;
  public currentEntry: Entry;
  public subscriptionHandler = new SubscriptionHandler();

  @Input() public searchEnabled = false;

  constructor(
    public afs: AngularFirestore,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.initList();
  }

  ngOnDestroy(): void {
    this.subscriptionHandler.unsubscribe();
  }


  public initList(): void {
    this.applyFilters();

    this.subscriptionHandler.register(this.deleting$.pipe(
      switchMap(deleting => this.entries$.pipe(
        map(entries => this.entries$.next(entries.filter(x => x.id !== (deleting && deleting.id))))
      ))
    ).subscribe());
  }

  public executeQuery() {
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

  public applyFilters() {
    this.querySub$ ? this.querySub$.unsubscribe() : this.query$ = undefined;
    this.entries$.next([]);
    const offset$ = this.offset.pipe(throttleTime(500));
    this.offset.next(null);
    this.deleting$.next(undefined);

    if (this.filterNoExerciseType) {
      this.query$ = offset$.pipe(mergeMap(offset => this.afs.collection(this.collectionName, ref => ref
        .where('exerciseTypeId', '==', null).orderBy('name').startAfter(offset).limit(this.batchSize)).get()));
    } else {
      this.query$ = offset$.pipe(mergeMap(offset => this.afs.collection(this.collectionName, ref => ref
        .orderBy('name').startAfter(offset).limit(this.batchSize)).get()));
    }

    this.executeQuery();
  }


  public routeToHit(hit: any) {
    this.router.navigate([`${this.collectionName}/edit`, hit.id]);
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

  public trackById(index: number, item: Entry): string {
    return item.id;
  }

  public openDeleteModal(currentEntry: Entry): void {
    this.currentEntry = currentEntry;
    $(() => {
      $('#deleteModal').modal('show');
    });
  }

  public closeDeleteModal(): void {
    $('#deleteModal').modal('hide');
  }

  public delete(): void {
    this.afs.doc(`${this.collectionName}/${this.currentEntry.id}`).delete();
    this.deleting$.next(this.currentEntry);
    $('#deleteModal').modal('hide');
  }
}
