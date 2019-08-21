import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from 'src/app/start/services/data-service';
import { StorageService } from 'src/app/start/services/storage.service';
import { Equipment } from '../models/equipment';

@Injectable({ providedIn: 'root' })
export class EquipmentService extends DataService<Equipment> {
    constructor(
        protected afs: AngularFirestore,
        protected storageService: StorageService
    ) { super(afs, storageService, 'equipment'); }
}
