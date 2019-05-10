import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise';
import { Observable, BehaviorSubject, combineLatest, merge, pipe, of } from 'rxjs';
import { ExerciseType } from 'src/app/models/exercise-type';
import { map, shareReplay, take, switchMap, filter, mergeMap, tap, debounceTime } from 'rxjs/operators';
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
  public loading = false;

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
    this.toggleLoading();
    this.selectedExerciseTypes$.pipe(
      switchMap(exerciseTypes => combineLatest(exerciseTypes.map(exerciseType => this.getRandom(exerciseType.id)))),
      map(exercises => this.exercises$.next(exercises.reduce((a, b) => a.concat(b), []))),
      tap(() => this.toggleLoading()),
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

  public toggleDragExercises(): void {
    this.dragExercises = !this.dragExercises;
  }

  public setCurrentExercise(exercise: Exercise): void {
    this.currentExercise = exercise;
  }

  public shuffle(): void {
    const ex = this.exercises$.pipe(
      take(1),
      map(exercises => shuffle(exercises)),
    ).subscribe();
  }

  public toggleLoading(): void {
    this.loading = !this.loading;
  }

  public applyExerciseTypeOrder(): void {
    combineLatest(
      this.selectedExerciseTypes$,
      this.exercises$.pipe(take(1))
    ).pipe(
      map(([selectedExercises, exercises]) => {
        const orderedExercises: Exercise[] = selectedExercises.map(selectedExercise => {
          return exercises.filter(exercise => exercise.exerciseTypes.includes(selectedExercise.id));
        }).reduce((a, b) => a.concat(b), []);

        this.exercises$.next(Array.from(new Set(orderedExercises)));
      }),
      take(1)
    ).subscribe();
  }

  public trackById(item): string {
    return item.id;
  }

  public exerciseDrop(event: CdkDragDrop<string[]>): void {
    this.exercises$.pipe(map(exercises => moveItemInArray(exercises, event.previousIndex, event.currentIndex)), take(1)).subscribe();
  }

  public exerciseTypeOrderDrop(event: CdkDragDrop<string[]>): void {
    this.selectedExerciseTypes$.pipe(map(exerciseTypes => moveItemInArray(exerciseTypes, event.previousIndex, event.currentIndex)), take(1)).subscribe();
  }

  /**
   * Replaces an exercise in the program with another exercise.
   * Exercise is of same difficulty and targets same muscles (roughly)
   */
  public differentVersion(exercises: Exercise[], exercise: Exercise): void {
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
  public easierVersion(): void {

  }

  /**
   * Replaces an exercise in the program with another exercise.
   * Exercise is of higher difficulty, but still targets the same muscles (roughly)
   */
  public harderVersion(): void {

  }
}
