import { Entry } from './entry';

export class ExerciseType extends Entry {
    public name: string;

    constructor(values: Partial<ExerciseType>) {
        super(values);
    }
}
