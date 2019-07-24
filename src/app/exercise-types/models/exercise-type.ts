import { Entry } from 'src/app/start/models/entry';

export class ExerciseType extends Entry {
    public name: string;
    public attributes: string[];

    constructor(values: Partial<ExerciseType>) {
        super();
        Object.assign(this, values);
    }
}
