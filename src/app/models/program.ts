import { Exercise } from './exercise';
import { Injectable } from '@angular/core';
import { ExerciseType } from './exercise-type';
import { DatabaseService } from '../services/database.service';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class Program {
    public exercises$: Observable<Exercise[]>;
    public exerciseTypes$: Observable<ExerciseType[]>;

    constructor(public db: DatabaseService) {
        this.exercises$ = this.db.getAll<Exercise>('exercises');
        this.exerciseTypes$ = this.db.getAll<Exercise>('exercise-types');
    }

    public createProgram(): Observable<Exercise[]> {
        return combineLatest(
            this.exercises$,
            this.exerciseTypes$
        ).pipe(
            map(values => {
                const [exercises, exerciseTypes] = values;
                const finalExercises = [];
                // const hPull = exercises.filter(exercise => exercise.exerciseTypes.includes(ExerciseType.horizontalPull));
                // const hPush = exercises.filter(exercise => exercise.exerciseTypes.includes(ExerciseType.horizontalPush));
                // const vPull = exercises.filter(exercise => exercise.exerciseTypes.includes(ExerciseType.verticalPull));
                // const vPush = exercises.filter(exercise => exercise.exerciseTypes.includes(ExerciseType.verticalPush));
                // const legs = exercises.filter(exercise => [ExerciseType.lift, ExerciseType.lunge, ExerciseType.squat].some(condition => exercise.exerciseTypes.includes(condition)));
                // const core = exercises.filter(exercise => exercise.exerciseTypes.includes());

                // this.exercises = this.exercises.concat([
                //     ...shuffle(hPull).slice(0, 1),
                //     ...shuffle(hPush).slice(0, 1),
                //     ...shuffle(vPull).slice(0, 1),
                //     ...shuffle(vPush).slice(0, 1),
                //     ...shuffle(legs).slice(0, 2),
                //     ...shuffle(core).slice(0, 2)
                // ]);

                return exercises;
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