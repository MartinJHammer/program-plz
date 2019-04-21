import { OnInit, ViewChild, Component, Input, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap, throttleTime, mergeMap, scan, switchMap } from 'rxjs/operators';
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
  // -> make crud delete generic
  //    > move entities stuff to crud service (redux is center of data)
  //    > ensure item isn't removed locally before delete is actually pressed
  //    > Use filter instead of splice to remove item.
  // -> make crud create generic (exercises)
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
  public entries$ = new BehaviorSubject([]);
  public entries: any;
  public deleting$ = new BehaviorSubject(undefined);

  @Output() public delete = new EventEmitter<Entry>();

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
    this.entries$ = this.entries$.pipe(tap(data => console.log({ data }))) as any;
    this.offset.pipe(
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
      // map(entries => {
      //   const foundIndex = entries.findIndex(x => x.id === (this.deleted && this.deleted.id));
      //   if (foundIndex >= 0) {
      //     this.deleted = undefined;
      //     entries.splice(foundIndex, 1);
      //   }
      //   return entries;
      // })
    ).subscribe();


    this.deleting$.pipe(
      switchMap(deleting => this.entries$.pipe(
        map(entries => {
          const foundIndex = entries.findIndex(x => x.id === (deleting && deleting.id));
          if (foundIndex >= 0) {
            entries.splice(foundIndex, 1);
            this.entries$.next([...entries]);
            this.deleting$.next(undefined);
          }
        })
      ))
    ).subscribe();
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

  public deleteEntry(currentEntry: Entry): void {
    this.deleting$.next(currentEntry);
    // this.afs.doc(`${this.collectionName}/${currentEntry.id}`).delete();
    this.delete.emit(currentEntry);
  }
}
