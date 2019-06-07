import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { firestore } from 'firebase';

@Injectable({ providedIn: 'root' })
export class DatabaseService<T> {

    private lastVisible: any;

    constructor(
        public afs: AngularFirestore
    ) { }

    public get(path: string): Observable<T[]> {
        return this.afs.collection(path, ref => ref.orderBy('name').startAt(this.lastVisible ? this.lastVisible : 0).limit(10)).get().pipe(
            map(docs => {
                this.lastVisible = docs.docs[docs.docs.length - 1];
                return docs.docs.map(e => {
                    return {
                        id: e.id,
                        ...e.data()
                    } as any;
                });
            })
        );
    }

    public getAll(path: string): Observable<T[]> {
        return this.afs.collection<T>(path).snapshotChanges().pipe(
            map(docs => docs.map(e => {
                return {
                    id: e.payload.doc.id,
                    ...e.payload.doc.data()
                } as T;
            })),
        );
    }

    public getSingle(path: string, id: string): Observable<T> {
        return this.afs.doc<T>(`${path}/${id}`).get().pipe(
            map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                } as any;
            })
        );
    }

    public add(path: string, entity: T): Promise<DocumentReference> {
        return this.afs.collection<T>(path).add(entity);
    }

    public update(path: string, entity: T): Promise<void> {
        return this.afs.doc(path).update(entity);
    }

    public delete(path: string): Promise<void> {
        return this.afs.doc(path).delete();
    }

    public removeFieldValue(path: string, field: string): Promise<void> {
        const remove = {};
        remove[field] = firestore.FieldValue.delete();
        return this.afs.doc(path).update(remove);
    }
}
