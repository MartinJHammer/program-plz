import { Field } from './field';
import { DataService } from 'src/app/start/services/data-service';
import { Entry } from 'src/app/start/models/entry';

export class SelectField<T extends Entry> extends Field {
    public collection: string;
    public displayKey: string;
    public service: DataService<T>;
    constructor(values: Partial<SelectField<T>>) {
        super();
        Object.assign(this, values);
    }
}
