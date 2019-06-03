import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const env = functions.config();

import * as algoliasearch from 'algoliasearch';

// Initialize the Algolia Client
const client = algoliasearch(env.algolia.app_id, env.algolia.api_key);
const exercisesIndex = client.initIndex('exercises');

//#region Algolia
/**
 * Index on create
 */
exports.indexExercise = functions.firestore
    .document('exercises/{id}')
    .onCreate((snap, context) => {
        // Add the data to the algolia index
        return exercisesIndex.addObject({
            objectID: snap.id,
            ...snap.data()
        });
    });

/**
 * Update on update
 */
exports.updateExercise = functions.firestore
    .document('exercises/{id}')
    .onUpdate((snap, context) => {
        // Update the data in the algolia index
        return exercisesIndex.partialUpdateObject({
            objectID: snap.after.id,
            ...snap.after.data()
        });
    });

/**
* Remove from index on delete
*/
exports.unindexExercise = functions.firestore
    .document('exercises/{id}')
    .onDelete((snap, context) => {
        // Delete an ID from the index
        return exercisesIndex.deleteObject(snap.id);
    });
//#endregion