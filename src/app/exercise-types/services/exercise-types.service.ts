import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StorageService } from 'src/app/start/services/storage.service';
import { DataService } from 'src/app/start/services/data-service';
import { ExerciseType } from '../models/exercise-type';
import { AuthService } from 'src/app/start/services/auth.service';
import { PreferencesService } from 'src/app/program/services/preferences.service';
import { map, switchMap } from 'rxjs/operators';
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
        return this.preferencesService.getDefaultExerciseTypes().pipe(
            switchMap(defaultExerciseTypes => this.getAll().pipe(
                map(exerciseTypes => exerciseTypes.filter(exerciseType => defaultExerciseTypes.includes(exerciseType.id)))
            ))
        );
    }

    public get prefferedFirst(): Observable<ExerciseType[]> {
        return this.preferencesService.getDefaultExerciseTypeOrder().pipe(
            switchMap(prefferedOrder => this.getAll().pipe(
                map(exerciseTypes => [...exerciseTypes].sort((a, b) => {
                    return prefferedOrder.indexOf(a.id) - prefferedOrder.indexOf(b.id);
                }))
            ))
        );
    }

    public get prefferedOnlyOrdered(): Observable<ExerciseType[]> {
        return this.preferencesService.getDefaultExerciseTypeOrder().pipe(
            switchMap(defaultExerciseTypeOrder => this.getAll().pipe(
                map(exerciseTypes => defaultExerciseTypeOrder
                    .map(orderId => exerciseTypes.filter(exerciseType => exerciseType.id === orderId))
                    .reduce((a, b) => a.concat(b), [])
                )
            ))
        );
    }
}
