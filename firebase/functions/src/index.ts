import * as functions from 'firebase-functions';
import * as algoliasearch from 'algoliasearch';

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});


// Update the search index every time a blog post is written.
exports.onExerciseCreated = functions.firestore.document('exercises/{id}').onCreate((snap, context) => {
    // Get the exercise document
    const exercise = snap.data();

    // Add an 'objectID' field which Algolia requires
    if (exercise) {
        exercise.objectID = context.params.id;
        // Write to the algolia index
        const index = client.initIndex('exercises');
        return index.saveObject(exercise);
    }
    return exercise;
});

exports.searchExercises = functions.firestore.document('search/exercises/{}').onCreate((snap, context) => {
    const index = client.initIndex('exercises');
    const query = context.params.query;

    // Perform an Algolia search:
    // https://www.algolia.com/doc/api-reference/api-methods/search/
    index.search({ query }).then((responses) => {
        // Response from Algolia:
        // https://www.algolia.com/doc/api-reference/api-methods/search/#response-format
        console.log(responses.hits);
        return responses.hits;
    });
});