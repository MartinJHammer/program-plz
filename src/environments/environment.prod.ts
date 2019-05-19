import { firebaseCredentials } from './firebase-credentials';
import { algoliaCredentials } from './algolia-credentials';

export const environment = {
  production: true,
  firebase: firebaseCredentials,
  algolia: algoliaCredentials
};
