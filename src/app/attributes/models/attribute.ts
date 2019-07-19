import { Entry } from 'src/app/start/models/entry';

export class Attribute extends Entry {
    constructor(values: Partial<Attribute>) {
        super(values);
        Object.assign(this, values);
    }
}
