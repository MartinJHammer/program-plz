import { Utilities } from './utilities';
import { instantiateEntry } from '../helpers/instantiate-entry';

export class Entry {
    public id: string;
    public random: number;
    public util: Utilities;

    constructor(values: Partial<Entry>) {
        Object.assign(this, instantiateEntry(values));
    }
}
