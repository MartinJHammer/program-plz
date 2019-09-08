import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from 'src/app/start/services/data-service';
import { StorageService } from 'src/app/start/services/storage.service';
import { Exercise } from '../models/exercise';
import { AuthService } from 'src/app/start/services/auth.service';

@Injectable({ providedIn: 'root' })
export class ExercisesService extends DataService<Exercise> {
    constructor(
        protected afs: AngularFirestore,
        protected storageService: StorageService,
        protected authService: AuthService
    ) { super(afs, storageService, authService, 'exercises'); }
}
