import { Entry } from '../models/entry';
import { Utilities } from '../models/utilities';

export const instantiateEntry = <T extends Entry>(entry: Partial<T>, extraLogic?: (entry: Partial<T>) => {}): Partial<T> => {
    entry.util = new Utilities();
    if (extraLogic) {
        extraLogic(entry);
    }
    return entry;
}
