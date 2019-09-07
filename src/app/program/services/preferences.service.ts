import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/start/services/storage.service';
import { Preferences } from '../models/preferences';
import { DataService } from 'src/app/start/services/data-service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class PreferencesService extends DataService<Preferences> {
    constructor(
        protected afs: AngularFirestore,
        protected storageService: StorageService
    ) { super(afs, storageService, 'preferences'); }
}
