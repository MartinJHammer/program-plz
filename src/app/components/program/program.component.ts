import { Component, OnInit, ViewChild } from '@angular/core';
import { Exercise } from 'src/app/models/exercise';
import { Observable, BehaviorSubject, combineLatest, merge, of, EMPTY } from 'rxjs';
import { ExerciseType } from 'src/app/models/exercise-type';
import { map, shareReplay, take, switchMap, filter, mergeMap, tap, expand } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { getRandomNumber } from 'src/app/helpers/random-number';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { shuffle } from 'src/app/helpers/shuffle';
import { AuthService } from 'src/app/services/auth.service';
import { MatSelect } from '@angular/material/select';
import { docsMap } from 'src/app/helpers/docs-map';

declare var $: any;

@Component({
  selector: 'pp-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
  public allExerciseTypes$: Observable<ExerciseType[]>;
  private exerciseTypesList: MatSelect;
  @ViewChild('exerciseTypesList') set content(exerciseTypesList: MatSelect) {
    this.exerciseTypesList = exerciseTypesList;
  }
  public currentExercise: Exercise;
  public exercises$ = new BehaviorSubject<Exercise[]>([]);
  public selectedExerciseTypes$ = new BehaviorSubject<ExerciseType[]>([]);
  public dragExercises = false;
  public loading = false;
  public exercisesToAdd: Exercise[] = [];

  constructor(
    public afs: AngularFirestore,
    public auth: AuthService
  ) { }

  ngOnInit() {
    const strengthId$ = this.afs.collection('attributes').get().pipe(docsMap, mergeMap(x => x), filter(x => x.name === 'Strength'), map(x => x.id));

    this.allExerciseTypes$ = strengthId$.pipe(
      switchMap(strengthId => this.afs
        .collection('exercise-types', ref => ref.where('attributes', 'array-contains', strengthId))
        .get().pipe(docsMap, shareReplay(1)))
    );

    this.allExerciseTypes$.pipe(map(exerciseTypes => this.selectedExerciseTypes$.next(exerciseTypes)), take(1)).subscribe();
  }

  public selectAllExerciseTypes() {
    this.exerciseTypesList.options.forEach(x => x.select());
    this.allExerciseTypes$.pipe(map(exerciseTypes => this.selectedExerciseTypes$.next(exerciseTypes)), take(1)).subscribe();
  }

  public deSelectAllExerciseTypes() {
    this.exerciseTypesList.options.forEach(x => x.deselect());
    this.selectedExerciseTypes$.next([]);
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

    const request$ = this.afs.collection('exercises', ref => ref.where('random', '>=', randomNumber).orderBy('random').where('exerciseTypeId', '==', exerciseTypeId).orderBy('id').limit(1)).get();
    const retryRequest$ = this.afs.collection('exercises', ref => ref.where('random', '<=', randomNumber).orderBy('random', 'desc').where('exerciseTypeId', '==', exerciseTypeId).orderBy('id').limit(1)).get();

    const random$ = request$.pipe(docsMap).pipe(filter(x => x !== undefined && x[0] !== undefined));

    const retry$ = request$.pipe(docsMap).pipe(
      filter(x => x === undefined || x[0] === undefined),
      switchMap(() => retryRequest$),
      docsMap
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
    this.exercises$.pipe(
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
          return exercises.filter(exercise => exercise.exerciseTypeId === selectedExercise.id);
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

  public openAddModal(): void {
    $(() => {
      $('#addModal').modal('show');
    });
  }

  public closeAddModal(): void {
    this.exercisesToAdd = [];
    $('#addModal').modal('hide');
  }

  public addToAdding(exercise: Exercise) {
    this.exercisesToAdd.push(new Exercise(exercise));
  }

  public removeFromAdding(exercise: Exercise) {
    this.exercisesToAdd = this.exercisesToAdd.filter(x => x.id !== exercise.id);
  }

  public addExercises(): void {
    this.exercises$.next(this.exercisesToAdd.concat(this.exercises$.getValue()));
    this.exercisesToAdd = [];
    this.closeAddModal();
  }

  /**
   * Replaces an exercise in the program with another exercise.
   * Exercise is of same difficulty and targets same muscles
   */
  public differentVersion(exercise: Exercise, exerciseIndex: number): void {
    const newExercise$ = of(exercise.exerciseTypeId).pipe(
      tap(() => exercise.util.loading = true),
      switchMap(exerciseTypeId => this.getRandom(exerciseTypeId)),
      mergeMap(x => x)
    );

    const retry$ = newExercise$.pipe(expand(newExercise => newExercise.id === exercise.id ? newExercise$ : EMPTY));

    retry$.pipe(
      tap(newExercise => newExercise.util.loading = false),
      switchMap(newExercise => this.exercises$.pipe(
        map(currentExercises => {
          currentExercises[exerciseIndex] = newExercise;
          return currentExercises;
        }),
        take(1)
      )),
      map(newExercises => this.exercises$.next(newExercises)),
      take(10)
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

  public openRemoveModal(currentExercise: Exercise): void {
    this.currentExercise = currentExercise;
    $(() => {
      $('#removeModal').modal('show');
    });
  }

  public closeRemoveModal(): void {
    $('#removeModal').modal('hide');
  }

  public removeExercise() {
    this.exercises$.pipe(
      take(1),
      map(exercises => {
        this.exercises$.next(exercises.filter(exercise => exercise.id !== this.currentExercise.id));
        this.closeRemoveModal();
      }),
    ).subscribe();
  }
}
