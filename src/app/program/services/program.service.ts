import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest, merge, of, EMPTY } from 'rxjs';
import { ExerciseType } from 'src/app/exercise-types/models/exercise-type';
import { Exercise } from 'src/app/exercises/models/exercise';
import { docsMap } from 'src/app/start/helpers/docs-map';
import { mergeMap, filter, map, switchMap, take, expand, tap } from 'rxjs/operators';
import { getRandomNumber } from 'src/app/start/helpers/random-number';
import { shuffle } from 'src/app/start/helpers/shuffle';
import { StorageService } from 'src/app/start/services/storage.service';
import { ExerciseTypesService } from 'src/app/exercise-types/services/exercise-types.service';

@Injectable({ providedIn: 'root' })
export class ProgramService {
    public programCreated: boolean;
    public get exerciseTypes(): Observable<ExerciseType[]> { return this.allStrengthRelatedExerciseTypes$; }
    public get selectedExerciseTypes(): BehaviorSubject<ExerciseType[]> { return this.selectedExerciseTypes$; }

    private allStrengthRelatedExerciseTypes$: Observable<ExerciseType[]>;
    private selectedExerciseTypes$ = new BehaviorSubject<ExerciseType[]>([]);
    private exercises$ = new BehaviorSubject<Exercise[]>([]);

    constructor(
        private afs: AngularFirestore,
        private exerciseTypesService: ExerciseTypesService,
        private storageService: StorageService
    ) {
        this.loadProgramFromStorage();
    }

    public loadPreferences(): void {
        const strengthId$ = of('Zp0BbwRWuY5TjXDNVBA5'); // Strength id

        // 
        this.allStrengthRelatedExerciseTypes$ = combineLatest(
            strengthId$,
            this.exerciseTypesService.getAll()
        ).pipe(
            map(([strengthId, exerciseTypes]) => exerciseTypes.filter(exerciseType => exerciseType.attributes.includes(strengthId)))
        );

        this.allStrengthRelatedExerciseTypes$.pipe(map(exerciseTypes => this.selectedExerciseTypes$.next(exerciseTypes)), take(1)).subscribe();
    }

    /**
     * Inits the program.
     */
    public plz(): void {
        this.selectedExerciseTypes$.pipe(
            switchMap(exerciseTypes => combineLatest(exerciseTypes.map(exerciseType => this.getRandomExercise(exerciseType.id)))),
            map(exercises => this.updateProgram(exercises.reduce((a, b) => a.concat(b), []))),
            tap(() => this.programCreated = true),
            take(1)
        ).subscribe();
    }

    public getExercises$(): Observable<Exercise[]> {
        return this.exercises$;
    }

    public getExercises(): Exercise[] {
        return this.exercises$.getValue();
    }

    public updateProgram(exercises: Exercise[]) {
        this.exercises$.next(exercises);
        this.storageService.set('program', exercises);
    }

    /**
     * Removes an exercise from the program
     */
    public removeExercise(selectedExercise: Exercise) {
        this.exercises$.pipe(
            take(1), // Must come first to prevent infinite loop
            map(exercises => {
                this.updateProgram(exercises.filter(exercise => exercise.id !== selectedExercise.id));
            }),
        ).subscribe();
    }

    public selectAllExerciseTypes() {
        this.allStrengthRelatedExerciseTypes$.pipe(map(exerciseTypes => this.selectedExerciseTypes$.next(exerciseTypes)), take(1)).subscribe();
    }

    public deSelectAllExerciseTypes() {
        this.selectedExerciseTypes$.next([]);
    }

    public shuffleExercises(): void {
        this.exercises$.pipe(
            take(1),
            map(exercises => {
                const shuffledExercises = shuffle(exercises);
                this.updateProgram(shuffledExercises);
                return shuffledExercises;
            }),
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

                this.updateProgram(Array.from(new Set(orderedExercises)));
            }),
            take(1)
        ).subscribe();
    }

    public replaceWithRandom(exercise: Exercise, exerciseIndex: number): Observable<void> {
        const newExercise$ = of(exercise.exerciseTypeId).pipe(
            switchMap(exerciseTypeId => this.getRandomExercise(exerciseTypeId)),
            mergeMap(x => x)
        );

        const retry$ = newExercise$.pipe(expand(newExercise => newExercise.id === exercise.id ? newExercise$ : EMPTY));

        return retry$.pipe(
            map(newExercise => this.replaceExercise(newExercise, exerciseIndex)),
            take(10)
        );
    }

    public replaceExercise(newExercise: Exercise, exerciseIndex: number): void {
        const currentExercises = this.exercises$.getValue();
        currentExercises[exerciseIndex] = newExercise;
        this.updateProgram(currentExercises);
    }

    private loadProgramFromStorage() {
        this.storageService.select('program').pipe(
            take(1),
            tap((x: Exercise[]) => {
                if (x && x.length > 0) {
                    this.programCreated = true;
                }
                this.exercises$.next(x ? x : []);
            })
        ).subscribe();
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
