import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Entry } from 'src/app/models/entry';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { map, tap, throttleTime, mergeMap, scan, switchMap } from 'rxjs/operators';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { SubscriptionHandler } from 'src/app/helpers/subscription-handler';
import { environment } from 'src/environments/environment';
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

  @Input() public collectionName: string;
  @Input() public identifier: string;
  public currentEntry: Entry;
  public subscriptionHandler = new SubscriptionHandler();

  @Input() public searchEnabled = false;
  public searchConfig: any;
  public showSearchResults = false;

  constructor(
    public afs: AngularFirestore,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.initList();
    this.setSearchConfig();
  }

  ngOnDestroy(): void {
    this.subscriptionHandler.unsubscribe();
  }

  public searchChanged(query) {
    if (query.length) {
      this.showSearchResults = true;
    } else {
      this.showSearchResults = false;
    }
  }

  public setSearchConfig() {
    this.searchConfig = {
      ...environment.algolia,
      indexName: this.collectionName
    };
  }

  /**
   * Initial stream that listens to offset, and merges in new values.
   */
  public initList(): void {
    this.subscriptionHandler.register(this.offset.pipe(
      throttleTime(500), // prevent sending redundant requests
      mergeMap(offset => this.afs.collection(this.collectionName, ref => ref.orderBy('name').startAfter(offset).limit(this.batchSize)).get().pipe(
        tap(snapShot => (snapShot.docs.length ? null : (this.collectionEnd = true))),
        map(snapShot => snapShot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })))
      )),
      scan((acc, batch) => [...acc, ...batch], []), // merge all batches together
      map(entries => this.entries$.next(entries))
    ).subscribe());


    this.subscriptionHandler.register(this.deleting$.pipe(
      switchMap(deleting => this.entries$.pipe(
        map(entries => this.entries$.next(entries.filter(x => x.id !== (deleting && deleting.id))))
      ))
    ).subscribe());
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
