import { Entry } from 'src/app/start/models/entry';

export class Equipment extends Entry {
    public name: string;

    constructor(values: Partial<Equipment>) {
        super();
        Object.assign(this, values);
    }
}
