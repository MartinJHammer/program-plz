import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { DocumentChangeAction } from '@angular/fire/firestore';

/**
 * Maps incoming firebase data (fetched via .snapshotChanges()) to a proper instantiated entry.
 * Example: this.afs.collection<T>(path).snapshotChanges().pipe(snapshotChangesDocsMap);
 */
export const snapshotChangesDocsMap = pipe(
    map((docs: DocumentChangeAction<any>[]) => docs.map(e => {
        return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
        };
    })),
);
