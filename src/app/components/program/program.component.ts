import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise';
import { Observable, BehaviorSubject, combineLatest, merge, pipe, of } from 'rxjs';
import { ExerciseType } from 'src/app/models/exercise-type';
import { map, shareReplay, take, switchMap, filter, mergeMap } from 'rxjs/operators';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/firestore';
import { DatabaseService } from 'src/app/services/database.service';
import { getRandomNumber } from 'src/app/helpers/random-number';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { shuffle } from 'src/app/helpers/shuffle';

@Component({
  selector: 'pp-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

  public allExerciseTypes$: Observable<ExerciseType[]>;
  public currentExercise: Exercise;
  public exercises$ = new BehaviorSubject<Exercise[]>([]);
  public selectedExerciseTypes$ = new BehaviorSubject<ExerciseType[]>([]);
  public dragExercises = false;

  constructor(
    public afs: AngularFirestore,
    public db: DatabaseService<any>
  ) { }

  ngOnInit() {
    this.allExerciseTypes$ = this.db.getAll('exercise-types').pipe(shareReplay(1));
    const setInitialExerciseTypes = this.allExerciseTypes$.pipe(map(exerciseTypes => this.selectedExerciseTypes$.next(exerciseTypes)), take(1));
    setInitialExerciseTypes.subscribe();
  }

  public createProgram(): void {
    this.selectedExerciseTypes$.pipe(
      switchMap(exerciseTypes => combineLatest(exerciseTypes.map(exerciseType => this.getRandom(exerciseType.id)))),
      map(exercises => this.exercises$.next(exercises.reduce((a, b) => a.concat(b), []))),
      take(1)
    ).subscribe();
  }

  public getRandom(exerciseTypeId: string): Observable<Exercise[]> {
    const randomNumber = getRandomNumber();
    const request$ = this.afs.collection('exercises', ref => ref.where('random', '>=', randomNumber).orderBy('random').where('exerciseTypes', 'array-contains', exerciseTypeId).orderBy('id').limit(1)).get();
    const retryRequest$ = this.afs.collection('exercises', ref => ref.where('random', '<=', randomNumber).orderBy('random', 'desc').where('exerciseTypes', 'array-contains', exerciseTypeId).orderBy('id').limit(1)).get();

    const docMap = pipe(
      map((docs: QuerySnapshot<any>) => {
        return docs.docs.map(e => {
          return {
            id: e.id,
            ...e.data()
          } as any;
        });
      })
    );

    const random$ = request$.pipe(docMap).pipe(filter(x => x !== undefined && x[0] !== undefined));

    const retry$ = request$.pipe(docMap).pipe(
      filter(x => x === undefined || x[0] === undefined),
      switchMap(() => retryRequest$),
      docMap
    );

    return merge(random$, retry$);
  }

  public toggleDragExercises() {
    this.dragExercises = !this.dragExercises;
  }

  public setCurrentExercise(exercise: Exercise) {
    this.currentExercise = exercise;
  }

  public shuffle() {
    const ex = this.exercises$.pipe(
      take(1),
      map(exercises => shuffle(exercises)),
    ).subscribe();
  }

  public applyExerciseTypeOrder(): void {
    combineLatest(
      this.selectedExerciseTypes$,
      this.exercises$.pipe(take(1))
    ).pipe(
      map(([selectedExercises, exercises]) => {
        this.exercises$.next(getNewOrder(selectedExercises, exercises));
      }),
      take(1)
    ).subscribe();
  }

  public trackById(item) {
    return item.id;
  }

  public exerciseDrop(event: CdkDragDrop<string[]>) {
    this.exercises$.pipe(map(exercises => moveItemInArray(exercises, event.previousIndex, event.currentIndex)), take(1)).subscribe();
  }

  public exerciseTypeOrderDrop(event: CdkDragDrop<string[]>) {
    this.selectedExerciseTypes$.pipe(map(exerciseTypes => moveItemInArray(exerciseTypes, event.previousIndex, event.currentIndex)), take(1)).subscribe();
  }

  /**
   * Replaces an exercise in the program with another exercise.
   * Exercise is of same difficulty and targets same muscles (roughly)
   */
  public differentVersion(exercises: Exercise[], exercise: Exercise) {
    of(exercise.exerciseTypes).pipe(
      switchMap(exerciseTypeIds => combineLatest(exerciseTypeIds.map(exerciseTypeId => this.getRandom(exerciseTypeId)))),
      map(newExercises => newExercises.reduce((a, b) => a.concat(b), [])),
      mergeMap(x => x),
      switchMap(newExercise => this.exercises$.pipe(
        map(currentExercises => currentExercises.map(currentExercise => currentExercise.id !== exercise.id ? currentExercise : newExercise)),
        take(1)
      )),
      map(newExercises => this.exercises$.next(newExercises)),
      take(1)
    ).subscribe();
  }

  /**
   * Replaces an exercise in the program with another exercise.
   * Exercise is of lower difficulty, but still targets the same muscles (roughly)
   */
  public easierVersion() {

  }

  /**
   * Replaces an exercise in the program with another exercise.
   * Exercise is of higher difficulty, but still targets the same muscles (roughly)
   */
  public harderVersion() {

  }
}



function getNewOrder(arrayWithOrder, targetArray) {
  // Get an identifier from the array you want to base the order on
  const newIds = arrayWithOrder.map(x => x.id);

  // Get an identifier from the array you want to update
  const ids = targetArray.map(x => x.id);

  // placeholder for order
  const order = [];

  // loop through the ids, pushing the arrayToOrder's index of the new order ids
  // We end up with an array of indexes
  for (let i = 0; i < ids.length; i++) {
    order.push(ids.indexOf(newIds[i]));
  }

  // reorder the array
  return reorderIds(order, targetArray);
}

// Preform the reordering
function reorderIds(order, arrayToOrder) {
  // Get a copy of the array we want to change
  const temp = arrayToOrder.slice(0);

  // loop through the indexes
  // use the indexes to place the items in the right place from the copy into the original
  for (let i = 0; i < arrayToOrder.length; i++) {
    arrayToOrder[order[i]] = temp[i];
  }

  return arrayToOrder;
}