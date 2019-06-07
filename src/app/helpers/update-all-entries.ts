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
 * 1. Remember to install algoliasearch (DO NOT USE --save)
 * 2. Import here: import * as algoliasearch from 'algoliasearch';
 * 3. Update below path to indice (algolia index name) you want
 * 4. Get the Algolia Admin API Key and replace '...' with it. THIS MUST NOT BE TRACKED!!!
 * 5. Call in any component >>> updateAllEntries('exercises', this.db, indexToAlgolia, false);
 */
export const indexToAlgolia = (entries: Entry[]): Entry[] => {
    return entries;
    // Initialize the Algolia Client
    // const client = algoliasearch(environment.algolia.appId, '...');
    // const index = client.initIndex('exercises');

    // return entries.map(entry => {
    //     // Add the data to the algolia index
    //     console.log('adding');
    //     index.addObject({
    //         objectID: entry.id,
    //         ...entry
    //     });
    //     return entry;
    // });
};

/**
 * Remove prop from all
 */
export const removePropFromAll = (collectionPath: string, propName: string, db: DatabaseService<any>) => {
    return db.getAll(collectionPath).pipe(
        take(1),
        map(entries => entries.map(entry => {
            db.removeFieldValue(collectionPath + '/' + entry.id, propName);
            return entry;
        }))
    ).subscribe();
};


/**
 * Adds a random number to all documents in a collection.
 */
export const updateAllEntries = (collectionPath: string, db: DatabaseService<any>, logic: (entries: Entry[]) => Entry[], updateOnFirestore: boolean = true) => {
    db.getAll(collectionPath).pipe(
        map(entries => {
            const updatedEntries = logic(entries);

            if (updateOnFirestore) {
                updatedEntries.forEach(entry => this.db.update(collectionPath + '/' + entry.id, entry));
            }
        }),
        take(1),
    ).subscribe();
};
