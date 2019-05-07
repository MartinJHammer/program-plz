import { map, take } from 'rxjs/operators';
import { DatabaseService } from '../services/database.service';
import { getRandomNumber } from './random-number';

/**
 * Adds a random number to all documents in a collection.
 */
export const addRandomToAll = (collectionPath: string, db: DatabaseService<any>) => {
    db.getAll(collectionPath).pipe(
        map(entries => {
            const entriesWithRandom = entries.map(y => {
                y.random = getRandomNumber();
                return y;
            });
            entriesWithRandom.forEach(entry => this.db.update(collectionPath + '/' + entry.id, entry));
        }),
        take(1),
    ).subscribe();
};
