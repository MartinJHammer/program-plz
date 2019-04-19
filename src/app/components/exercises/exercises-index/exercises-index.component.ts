import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Exercise } from 'src/app/models/exercise';
import { Observable, BehaviorSubject } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { map, tap, throttleTime, mergeMap, scan } from 'rxjs/operators';
import { CrudService } from 'src/app/services/crud.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'program-plz-exercises',
  templateUrl: './exercises-index.component.html',
  styleUrls: ['./exercises-index.component.scss']
})
export class ExercisesIndexComponent implements OnInit {

  // Infinite
  @ViewChild(CdkVirtualScrollViewport) public viewport: CdkVirtualScrollViewport;
  public theEnd = false;
  public offset = new BehaviorSubject(null);
  public infinite$: Observable<any>;
  public batchSize = 10;



  // public exercises: Observable<Exercise[]>;
  public currentExercise: Exercise;

  constructor(
    public db: DatabaseService<Exercise>,
    public afs: AngularFirestore,
    public service: ExerciseService,
    public crudService: CrudService
  ) { }

  ngOnInit() {
    // this.exercises = this.service.get().pipe(map(ex => {
    //   return ex.sort((a, b) => (a.name > b.name) ? 1 : -1);
    // }));

    this.initInfinite();
  }

  public initInfinite(): void {
    const batchMap = this.offset.pipe(
      throttleTime(500),
      mergeMap(x => this.getBatch(x)),
      scan((acc, batch) => {
        return { ...acc, ...batch };
      })
    );

    this.infinite$ = batchMap.pipe(
      map(x => Object.values(x))
    );
  }

  public getBatch(lastSeen: string) {
    return this.afs.collection('exercises', ref => ref.orderBy('name').startAfter(lastSeen).limit(this.batchSize)).snapshotChanges().pipe(
      tap(arr => (arr.length ? null : (this.theEnd = true))),
      map(arr => {
        return arr.reduce((acc, cur) => {
          const id = cur.payload.doc.id;
          const data = cur.payload.doc.data();
          return { ...acc, [id]: data };
        }, {});
      })
    );
  }

  public nextBatch(event: any, offset: number): void {
    if (this.theEnd) {
      return;
    }

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();

    if (end === total) {
      this.offset.next(offset);
    }
  }

  public trackByIndex(index: number) {
    return index;
  }



  public setCurrentExercise(exercise: Exercise): void {
    this.currentExercise = exercise;
  }

  public delete(exercise: Exercise): void {
    this.db.delete(`exercises/${exercise.id}`);
  }
}
