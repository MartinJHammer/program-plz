import { Exercise } from './exercise';
import { Database } from '../database/database';

export abstract class Program {
    public description: string;
    public exercises: Exercise[] = [];
    public duration: number;

    constructor(values: Partial<Program>) {
        Object.assign(this, values);
    }

    public abstract createProgram(db: Database);

    /**
     * Replaces an exercise in the program with another exercise.
     * Exercise is of same difficulty and targets same muscles (roughly)
     */
    public differentVersion(exercise: Exercise) {

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
}
