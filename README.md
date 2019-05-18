## Program Plz!

Have a program :)

### Firebase stuff
*Store env vars*
firebase functions:config:set  someservice.some_key="123" --project program-plz
firebase functions:config:get program-plz

*Update tools - run from functions folder*
npm install firebase-functions@latest firebase-admin@latest --save
npm install -g firebase-tools

*Deploy functions only*
firebase deploy --only functions
firebase deploy --only firestore:rules
