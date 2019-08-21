import { Entry } from 'src/app/start/models/entry';

export class Equipment extends Entry {
    constructor(values: Partial<Equipment>) {
        super();
        Object.assign(this, values);
    }
}
