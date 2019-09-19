import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StorageService } from 'src/app/start/services/storage.service';
import { DataService } from 'src/app/start/services/data-service';
import { ExerciseType } from '../models/exercise-type';
import { AuthService } from 'src/app/start/services/auth.service';
import { PreferencesService } from 'src/app/program/services/preferences.service';
import { map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExerciseTypesService extends DataService<ExerciseType> {
    constructor(
        protected afs: AngularFirestore,
        protected storageService: StorageService,
        protected authService: AuthService,
        protected preferencesService: PreferencesService
    ) { super(afs, storageService, authService, 'exercise-types'); }

    public prefferedOnly(): Observable<ExerciseType[]> {
        return combineLatest(
            this.getAll(),
            this.preferencesService.getExerciseTypes(),
        ).pipe(
            map(([exerciseTypes, defaultExerciseTypes]) => exerciseTypes.filter(exerciseType => defaultExerciseTypes.includes(exerciseType.id)))
        );
    }

    public prefferedFirst(): Observable<ExerciseType[]> {
        return combineLatest(
            this.getAll(),
            this.preferencesService.getExerciseTypeOrder()
        ).pipe(
            map(([exerciseTypes, prefferedOrder]) => this.sortExerciseTypes(exerciseTypes, prefferedOrder))
        );
    }

    public prefferedOnlyOrdered(): Observable<ExerciseType[]> {
        return combineLatest(
            this.prefferedOnly(),
            this.preferencesService.getExerciseTypeOrder()
        ).pipe(
            map(([prefferedExerciseTypes, prefferedOrder]) => this.sortExerciseTypes(prefferedExerciseTypes, prefferedOrder))
        );
    }

    private sortExerciseTypes(exerciseTypes: ExerciseType[], prefferedOrder: string[]): any[] {
        return [...exerciseTypes].sort((a, b) => prefferedOrder.indexOf(a.id) - prefferedOrder.indexOf(b.id));
    }
}
