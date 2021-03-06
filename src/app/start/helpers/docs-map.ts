import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuerySnapshot } from '@angular/fire/firestore/interfaces';

/**
 * Maps incoming firebase data to a proper instantiated entry.
 * Example: this.afs.collection(path).get().pipe(docsMap);
 */
export const docsMap = pipe(
    map((docs: QuerySnapshot<any>) => {
        return docs.docs.map(e => {
            return {
                id: e.id,
                ...e.data()
            } as any;
        });
    })
);
