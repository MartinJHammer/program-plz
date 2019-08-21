import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from 'src/app/start/services/data-service';
import { StorageService } from 'src/app/start/services/storage.service';
import { Exercise } from '../models/exercise';

@Injectable({ providedIn: 'root' })
export class ExercisesService extends DataService<Exercise> {
    constructor(
        protected afs: AngularFirestore,
        protected storageService: StorageService
    ) { super(afs, storageService, 'exercises'); }
}
