import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, of, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class DatabaseService {

    constructor(
        public db: AngularFirestore,
        public storage: StorageService
    ) { }

    public getAll<T>(path: string): Observable<T[]> {
        return from(this.storage.retrieve(path)).pipe(
            switchMap(values => {
                if (values) {
                    return of(values);
                } else {
                    return this.db.collection<T>(path).snapshotChanges().pipe(
                        map(docs => docs.map(e => {
                            return {
                                id: e.payload.doc.id,
                                ...e.payload.doc.data()
                            } as T;
                        })),
                        map(data => {
                            this.storage.persist(path, data);
                            return data;
                        })
                    );
                }
            })
        );
    }

    // get local data --> if undefined, get from firestore --> push to local vars --> persist
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
