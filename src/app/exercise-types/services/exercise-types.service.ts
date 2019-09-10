import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StorageService } from 'src/app/start/services/storage.service';
import { DataService } from 'src/app/start/services/data-service';
import { ExerciseType } from '../models/exercise-type';
import { AuthService } from 'src/app/start/services/auth.service';
import { PreferencesService } from 'src/app/program/services/preferences.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExerciseTypesService extends DataService<ExerciseType> {
    constructor(
        protected afs: AngularFirestore,
        protected storageService: StorageService,
        protected authService: AuthService,
        protected preferencesService: PreferencesService
    ) { super(afs, storageService, authService, 'exercise-types'); }

    public get prefferedOnly(): Observable<ExerciseType[]> {
        return this.getAll().pipe(
            map(exerciseTypes => exerciseTypes.filter(exerciseType => this.preferencesService.default.exerciseTypes.includes(exerciseType.id)))
        );
    }

    public get prefferedFirst(): Observable<ExerciseType[]> {
        const prefferedOrder = this.preferencesService.default.exerciseTypesOrder;
        return this.getAll().pipe(
            map(exerciseTypes => [...exerciseTypes].sort((a, b) => {
                return prefferedOrder.indexOf(a.id) - prefferedOrder.indexOf(b.id);
            }))
        );
    }

    public get prefferedOnlyOrdered(): Observable<ExerciseType[]> {
        return this.getAll().pipe(
            map(exerciseTypes => this.preferencesService.default.exerciseTypesOrder
                .map(orderId => exerciseTypes.filter(exerciseType => exerciseType.id === orderId))
                .reduce((a, b) => a.concat(b), [])
            )
        );
    }
}
