import { OnInit, ViewChild, Component, Input, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, throttleTime, mergeMap, scan } from 'rxjs/operators';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AngularFirestore } from '@angular/fire/firestore';
import { CrudService } from '../../crud.service';
import { Entry } from 'src/app/models/entry';

@Component({
  selector: 'pp-infinite-list',
  templateUrl: './infinite-list.component.html',
  styleUrls: ['./infinite-list.component.scss']
})
export class InfiniteListComponent implements OnInit {

  // #############################
  // NEXT:
  // -> make crud create generic (exercises)
  // -> make crud delete generic
  // -> make crud create generic (exercise types)
  // -> make crud edit generic (first exercises, then exercise types)
  // -> make cloud function with totalCount
  // -> implement old program logic w. shuffle etc.
  // #############################

  @ViewChild(CdkVirtualScrollViewport) public viewport: CdkVirtualScrollViewport;
  @Input() public collectionName: string;
  @Input() public identifier: string;
  public collectionEnd = false;
  public offset = new BehaviorSubject(null);
  public batchSize = 10;
  public entries$: Observable<any>;
  public entries: any;
  public deleted: any;

  @Output() public delete = new EventEmitter<Entry>();

  constructor(
    public crudService: CrudService,
    public afs: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.offset = this.offset.pipe(tap(x => console.log('Current offset value: ', x))) as any;
    this.initList();
  }

  /**
   * Initial stream that listens to offset, and merges in new values.
   */
  public initList(): void {
    this.entries$ = this.offset.pipe(
      throttleTime(500), // prevent sending redundant requests
      mergeMap(offset => this.afs.collection(this.collectionName, ref => ref.orderBy('name').startAfter(offset).limit(this.batchSize)).get().pipe(
        tap(snapShot => (snapShot.docs.length ? null : (this.collectionEnd = true))),
        map(snapShot => snapShot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })))
      )),
      scan((acc, batch) => [...acc, ...batch], []), // merge all batches together
      map(entries => {
        const foundIndex = entries.findIndex(x => x.id === (this.deleted && this.deleted.id));
        if (foundIndex >= 0) {
          this.deleted = undefined;
          entries.splice(foundIndex, 1);
        }
        return entries;
      })
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

  public deleteEntry(currentEntry: Entry): void {
    this.deleted = currentEntry;
    // this.afs.doc(`${this.collectionName}/${currentEntry.id}`).delete();
    this.delete.emit(currentEntry);
  }
}
