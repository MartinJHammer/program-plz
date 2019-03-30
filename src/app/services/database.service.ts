import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

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
            }))
        );
    }

    public getSingleByParams<T>(path: string, activatedRoute: ActivatedRoute): Observable<T> {
        return activatedRoute.params.pipe(
            map(params => params.id),
            switchMap(id => this.db.doc<T>(`${path}/${id}`).get()),
            map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                } as any;
            })
        );
    }

    public add<T>(path: string, entity: T): Promise<DocumentReference> {
        return this.db.collection<T>(path).add(entity);
    }

    public update<T>(path: string, entity: T): Promise<void> {
        return this.db.doc(path).update(entity);
    }

    public delete(path: string): Promise<void> {
        return this.db.doc(path).delete();
    }
}
