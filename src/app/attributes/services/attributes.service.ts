import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StorageService } from 'src/app/start/services/storage.service';
import { DataService } from 'src/app/start/services/data-service';
import { Attribute } from '../models/attribute';
import { AuthService } from 'src/app/start/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AttributesService extends DataService<Attribute> {
    constructor(
        protected afs: AngularFirestore,
        protected storageService: StorageService,
        protected authService: AuthService
    ) { super(afs, storageService, authService, 'attributes'); }
}
