import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const env = functions.config();

import * as algoliasearch from 'algoliasearch';

// Initialize the Algolia Client
const client = algoliasearch(env.algolia.app_id, env.algolia.api_key);
const exercisesIndex = client.initIndex('exercises');

exports.indexExercise = functions.firestore
    .document('exercises/{id}')
    .onCreate((snap, context) => {
        const data = snap.data();
        const objectID = snap.id;

        // Add the data to the algolia index
        return exercisesIndex.addObject({
            objectID,
            ...data
        });
    });

exports.unindexExercise = functions.firestore
    .document('exercises/{id}')
    .onDelete((snap, context) => {
        const objectId = snap.id;

        // Delete an ID from the index
        return exercisesIndex.deleteObject(objectId);
    });