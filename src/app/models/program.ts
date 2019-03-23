import { Exercise } from './exercise';
import { Database } from '../database/database';
import { Injectable } from '@angular/core';
import { ExerciseType } from './exercise-type';

@Injectable({ providedIn: 'root' })
export class Program {
    public description: string;
    public exercises: Exercise[];
    public duration: number;

    constructor(public db: Database) { }

    public createProgram() {
        this.exercises = [];
        const hPull = this.db.exercises.getAll().filter(exercise => exercise.types.includes(ExerciseType.horizontalPull));
        const hPush = this.db.exercises.getAll().filter(exercise => exercise.types.includes(ExerciseType.horizontalPush));
        const vPull = this.db.exercises.getAll().filter(exercise => exercise.types.includes(ExerciseType.verticalPull));
        const vPush = this.db.exercises.getAll().filter(exercise => exercise.types.includes(ExerciseType.verticalPush));
        const legs = this.db.exercises.getAll().filter(exercise => [ExerciseType.lift, ExerciseType.lunge, ExerciseType.squat].some(condition => exercise.types.includes(condition)));
        const core = this.db.exercises.getAll().filter(exercise => exercise.types.includes(ExerciseType.core));

        this.exercises = this.exercises.concat([
            ...shuffle(hPull).slice(0, 1),
            ...shuffle(hPush).slice(0, 1),
            ...shuffle(vPull).slice(0, 1),
            ...shuffle(vPush).slice(0, 1),
            ...shuffle(legs).slice(0, 2),
            ...shuffle(core).slice(0, 2)
        ]);
    }

    /**
     * Replaces an exercise in the program with another exercise.
     * Exercise is of same difficulty and targets same muscles (roughly)
     */
    public differentVersion(exercise: Exercise) {
        const otherExercises = this.db.exercises
            .getAll()
            .filter(ex => exercise.types.some(condition => ex.types.includes(condition)))
            .filter(ex => ex.id !== exercise.id);
        const newExercise = shuffle(otherExercises).slice(0, 1)[0];
        this.replaceExercise(exercise, newExercise);
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
        this.exercises.forEach((ex, index) => {
            if (ex.id === exercise.id) {
                this.exercises[index] = newExercise;
            }
        });
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