import { map, take } from 'rxjs/operators';
import { DatabaseService } from '../services/database.service';
import { Entry } from '../models/entry';
import { getRandomNumber } from './random-number';

/**
 * Usage example: updateAllEntries('exercises', this.db, addRandomToAll);
 */
export const addRandomToAll = (entries: Entry[]): Entry[] => {
    return entries.map(entry => {
        entry.random = getRandomNumber();
        return entry;
    });
};

/**
 * Adds a random number to all documents in a collection.
 */
export const updateAllEntries = (collectionPath: string, db: DatabaseService<any>, logic: (entries: Entry[]) => Entry[]) => {
    db.getAll(collectionPath).pipe(
        map(entries => {
            const updatedEntries = logic(entries);
            updatedEntries.forEach(entry => this.db.update(collectionPath + '/' + entry.id, entry));
        }),
        take(1),
    ).subscribe();
};
