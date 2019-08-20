import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StorageService } from 'src/app/start/services/storage.service';
import { DataService } from 'src/app/start/services/data-service';
import { ExerciseType } from '../models/exercise-type';

@Injectable({ providedIn: 'root' })
export class ExerciseTypesService extends DataService<ExerciseType> {
    constructor(
        protected afs: AngularFirestore,
        protected storageService: StorageService
    ) { super(afs, storageService, 'exercise-types'); }
}
