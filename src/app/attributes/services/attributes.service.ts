import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StorageService } from 'src/app/start/services/storage.service';
import { DataService } from 'src/app/start/services/data-service';
import { Attribute } from '../models/attribute';

@Injectable({ providedIn: 'root' })
export class AttributesService extends DataService<Attribute> {
    constructor(
        protected afs: AngularFirestore,
        protected storageService: StorageService
    ) { super(afs, storageService, 'attributes'); }
}
