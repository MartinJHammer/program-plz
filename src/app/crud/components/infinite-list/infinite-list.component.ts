import { OnInit, ViewChild, Component, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, throttleTime, mergeMap, scan } from 'rxjs/operators';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AngularFirestore } from '@angular/fire/firestore';
import { CrudService } from '../../crud.service';

@Component({
  selector: 'pp-infinite-list',
  templateUrl: './infinite-list.component.html',
  styleUrls: ['./infinite-list.component.scss']
})
export class InfiniteListComponent implements OnInit {

  // #############################
  // NEXT: REFACTOR! Make Exercise + ExerciseType index completely generic/reusable.
  // -> make delete work
  // -> make edit work
  // -> make crud html reusable
  // -> implement on exercise type
  // #############################

  @ViewChild(CdkVirtualScrollViewport) public viewport: CdkVirtualScrollViewport;
  public collectionEnd = false;
  public offset = new BehaviorSubject(null);
  public entries$: Observable<any>;
  public batchSize = 10;

  @Input() public collectionName: string;
  @Input() public identifier: string;

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
      mergeMap(lastSeen => this.afs.collection(this.collectionName, ref => ref.orderBy('name').startAfter(lastSeen).limit(this.batchSize)).snapshotChanges().pipe(
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