import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest, merge, of, EMPTY } from 'rxjs';
import { ExerciseType } from 'src/app/exercise-types/models/exercise-type';
import { Exercise } from 'src/app/exercises/models/exercise';
import { docsMap } from 'src/app/start/helpers/docs-map';
import { mergeMap, filter, map, switchMap, shareReplay, take, expand, tap } from 'rxjs/operators';
import { getRandomNumber } from 'src/app/start/helpers/random-number';
import { shuffle } from 'src/app/start/helpers/shuffle';

@Injectable({ providedIn: 'root' })
export class ProgramService {
    public programCreated: boolean;

    public allExerciseTypes$: Observable<ExerciseType[]>;
    public exercises$ = new BehaviorSubject<Exercise[]>([]);
    public selectedExerciseTypes$ = new BehaviorSubject<ExerciseType[]>([]);

    constructor(
        public afs: AngularFirestore
    ) { }

    public loadPreferences(): void {
        const strengthId$ = this.afs.collection('attributes').get().pipe(docsMap, mergeMap(x => x), filter(x => x.name === 'Strength'), map(x => x.id));

        this.allExerciseTypes$ = strengthId$.pipe(
            switchMap(strengthId => this.afs
                .collection('exercise-types', ref => ref.where('attributes', 'array-contains', strengthId))
                .get().pipe(docsMap, shareReplay(1)))
        );

        this.allExerciseTypes$.pipe(map(exerciseTypes => this.selectedExerciseTypes$.next(exerciseTypes)), take(1)).subscribe();
    }

    /**
     * Returns exercises for the program.
     */
    public plz(): void {
        this.selectedExerciseTypes$.pipe(
            switchMap(exerciseTypes => combineLatest(exerciseTypes.map(exerciseType => this.getRandomExercise(exerciseType.id)))),
            map(exercises => this.exercises$.next(exercises.reduce((a, b) => a.concat(b), []))),
            tap(() => this.programCreated = true),
            take(1)
        ).subscribe();
    }

    /**
     * Removes an exercise from the program
     */
    public removeExercise(selectedExercise: Exercise) {
        this.exercises$.pipe(
            take(1), // Must come first to prevent infinite loop
            map(exercises => {
                this.exercises$.next(exercises.filter(exercise => exercise.id !== selectedExercise.id));
            }),
        ).subscribe();
    }

    public selectAllExerciseTypes() {
        this.allExerciseTypes$.pipe(map(exerciseTypes => this.selectedExerciseTypes$.next(exerciseTypes)), take(1)).subscribe();
    }

    public deSelectAllExerciseTypes() {
        this.selectedExerciseTypes$.next([]);
    }

    public shuffleExercises(): void {
        this.exercises$.pipe(
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
                const orderedExercises: Exercise[] = selectedExercises.map(selectedExercise => {
                    return exercises.filter(exercise => exercise.exerciseTypeId === selectedExercise.id);
                }).reduce((a, b) => a.concat(b), []);

                this.exercises$.next(Array.from(new Set(orderedExercises)));
            }),
            take(1)
        ).subscribe();
    }

    /**
     * Replaces an exercise in the program with another exercise.
     * Exercise is of same difficulty and targets same muscles
     */
    public differentVersion(exercise: Exercise, exerciseIndex: number): Observable<void> {
        const newExercise$ = of(exercise.exerciseTypeId).pipe(
            switchMap(exerciseTypeId => this.getRandomExercise(exerciseTypeId)),
            mergeMap(x => x)
        );

        const retry$ = newExercise$.pipe(expand(newExercise => newExercise.id === exercise.id ? newExercise$ : EMPTY));

        return retry$.pipe(
            switchMap(newExercise => this.exercises$.pipe(
                map(currentExercises => {
                    currentExercises[exerciseIndex] = newExercise;
                    return currentExercises;
                }),
                take(1)
            )),
            map(newExercises => this.exercises$.next(newExercises)),
            take(10)
        );
    }

    private getRandomExercise(exerciseTypeId: string): Observable<Exercise[]> {
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
}
