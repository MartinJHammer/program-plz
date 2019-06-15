import { Entry } from './entry';

export class ExerciseType extends Entry {
    public name: string;
    public attributes: string[];

    constructor(values: Partial<ExerciseType>) {
        super(values);
    }
}
