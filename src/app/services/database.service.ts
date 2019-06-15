import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { docsMap } from '../helpers/docs-map';
import { docMap } from '../helpers/doc-map';
import { snapshotChangesDocsMap } from '../helpers/snapshot-changes-docs-map';

@Injectable({ providedIn: 'root' })
export class DatabaseService<T> {

    private lastVisible: any;

    constructor(
        public afs: AngularFirestore
    ) { }

    public get(path: string): Observable<T[]> {
        return this.afs.collection(path, ref => ref.orderBy('name').startAt(this.lastVisible ? this.lastVisible : 0).limit(10)).get().pipe(
            tap(docs => this.lastVisible = docs.docs[docs.docs.length - 1]),
            docsMap
        );
    }

    public getAll(path: string): Observable<T[]> {
        return this.afs.collection<T>(path).snapshotChanges().pipe(snapshotChangesDocsMap);
    }

    public getSingle(path: string, id: string): Observable<T> {
        return this.afs.doc<T>(`${path}/${id}`).get().pipe(docMap);
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

    // Incomment when needed.
    // public removeFieldValue(path: string, field: string): Promise<void> {
    //     const remove = {};
    //     remove[field] = FieldValue.delete();
    //     return this.afs.doc(path).update(remove);
    // }
}
