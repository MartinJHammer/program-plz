import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DatabaseService {

    constructor(
        public db: AngularFirestore
    ) { }

    public getAll<T>(path: string): Observable<T[]> {
        return this.db.collection<T>(path).snapshotChanges().pipe(
            map(docs => docs.map(e => {
                return {
                    id: e.payload.doc.id,
                    ...e.payload.doc.data()
                } as T;
            })),
        );
    }

    // get local data --> if undefined, get from firestore --> push to local vars --> persist
    public getSingle<T>(path: string, id: string): Observable<T> {
        return this.db.doc<T>(`${path}/${id}`).get().pipe(
            map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                } as any;
            })
        );
    }

    // Push to fb --> push to local data --> persist
    public add<T>(path: string, entity: T): Promise<DocumentReference> {
        return this.db.collection<T>(path).add(entity);
    }

    // Push to fb --> replace local data --> persist
    public update<T>(path: string, entity: T): Promise<void> {
        return this.db.doc(path).update(entity);
    }

    // Push to fb -> remove from local data --> persist
    public delete(path: string): Promise<void> {
        return this.db.doc(path).delete();
    }
}
