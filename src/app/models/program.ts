import { Exercise } from './exercise';
import { Injectable } from '@angular/core';
import { ExerciseType } from './exercise-type';
import { Observable, combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseService } from '../services/database.service';

@Injectable({ providedIn: 'root' })
export class Program {
    public exercises$: Observable<Exercise[]>;
    public exerciseTypes$: Observable<ExerciseType[]>;

    constructor(
        public afs: AngularFirestore,
        public db: DatabaseService<any>
    ) {
    }

    public createProgram(): Observable<Exercise[]> {
        return combineLatest(
            this.db.getAll('exercises').pipe(shareReplay(1)),
            this.db.getAll('exercise-types').pipe(shareReplay(1))
        ).pipe(
            map(values => {
                const exercises: Exercise[] = values[0];
                const exerciseTypes: ExerciseType[] = values[1];
                const vPull = exercises.filter(exercise => exercise.exerciseTypes.includes(exerciseTypes.find(et => et.name === 'Vertical pull').id));
                const vPush = exercises.filter(exercise => exercise.exerciseTypes.includes(exerciseTypes.find(et => et.name === 'Vertical push').id));
                const hPull = exercises.filter(exercise => exercise.exerciseTypes.includes(exerciseTypes.find(et => et.name === 'Horizontal pull').id));
                const hPush = exercises.filter(exercise => exercise.exerciseTypes.includes(exerciseTypes.find(et => et.name === 'Horizontal push').id));
                const legs = exercises.filter(exercise => [
                    exerciseTypes.find(et => et.name === 'Squat').id,
                    exerciseTypes.find(et => et.name === 'Lunge').id,
                    exerciseTypes.find(et => et.name === 'Lift').id,
                ].some(condition => exercise.exerciseTypes.includes(condition)));
                const core = exercises.filter(exercise => exercise.exerciseTypes.includes(exerciseTypes.find(et => et.name === 'Core').id));

                return [
                    ...shuffle(vPull).slice(0, 1),
                    ...shuffle(vPush).slice(0, 1),
                    ...shuffle(hPull).slice(0, 1),
                    ...shuffle(hPush).slice(0, 1),
                    ...shuffle(legs).slice(0, 2),
                    ...shuffle(core).slice(0, 2)
                ];
            })
        );
    }

    /**
     * Replaces an exercise in the program with another exercise.
     * Exercise is of same difficulty and targets same muscles (roughly)
     */
    public differentVersion(exercise: Exercise) {
        // const otherExercises = this.db.exercises
        //     .getAll()
        //     .filter(ex => exercise.exerciseTypes.some(condition => ex.types.includes(condition)))
        //     .filter(ex => ex.id !== exercise.id);
        // const newExercise = shuffle(otherExercises).slice(0, 1)[0];
        // this.replaceExercise(exercise, newExercise);
    }

    /**
     * Replaces an exercise in the program with another exercise.
     * Exercise is of lower difficulty, but still targets the same muscles (roughly)
     */
    public easierVersion(exercise: Exercise) {

    }

    /**
     * Replaces an exercise in the program with another exercise.
     * Exercise is of higher difficulty, but still targets the same muscles (roughly)
     */
    public harderVersion(exercise: Exercise) {

    }

    private replaceExercise(exercise: Exercise, newExercise: any) {
        // this.exercises.forEach((ex, index) => {
        //     if (ex.id === exercise.id) {
        //         this.exercises[index] = newExercise;
        //     }
        // });
    }
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// TODO: Replace with _.sample()
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}