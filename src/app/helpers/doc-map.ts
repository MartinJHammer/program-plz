import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Maps incoming firebase data to a proper instantiated entry.
 * Use combined with when .doc().get().pipe(docMap)
 */
export const docMap = pipe(
    map((doc: any) => {
        return {
            id: doc.id,
            ...doc.data()
        } as any;
    })
);
