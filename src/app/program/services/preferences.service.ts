import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/start/services/storage.service';
import { Preferences } from '../models/preferences';
import { DataService } from 'src/app/start/services/data-service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/start/services/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { snapshotChangesDocsMap } from 'src/app/start/helpers/snapshot-changes-docs-map';
import { tap, take, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PreferencesService extends DataService<Preferences> {
    private defaultPreferences$ = new BehaviorSubject<Preferences>(null);

    constructor(
        protected afs: AngularFirestore,
        protected storageService: StorageService,
        protected authService: AuthService
    ) {
        super(afs, storageService, authService, 'preferences');
        this.defaultPreferences$.next(new Preferences({
            name: 'Default',
            userId: 'anon',
            equipment: [
                'C9ECIwaujcJRUF5XpvmT', // Barbell
                'fXBfzPw81q4oCx5OGLvG', // Dumbbell,
                'kDjXemCkSn1wanj18niS', // Pull up bar
                '5Qv21PNaeb2Fa1n1YfX2' // Body weight
            ],
            exerciseTypes: [
                'WFzDwfcWEr1WwVF1ylhp', // Lunge
                'dI2f23HP1pkg1JKez72M', // Lift
                's9CtNxXaNOzp8jE5qPXB', // Vertical push
                'tIBvOVz2iSLn7kI8ePry', // Vertical pull
                'ZTQOWAf0v7QmLD5gwAMW', // Horizontal pull
                'kDtgmFeQodOtZz95XRRV', // Horizontal push
                'VeIVmw2kboBdiwHFBfG0', // Carry
                'PGY7HqNN8uNrCkTBWcnc', // Support
                '4pA4Vk86oSQ1sVq3tctW' // Core
            ],
            exerciseTypesOrder: [
                'WFzDwfcWEr1WwVF1ylhp', // Lunge
                'dI2f23HP1pkg1JKez72M', // Lift
                's9CtNxXaNOzp8jE5qPXB', // Vertical push
                'tIBvOVz2iSLn7kI8ePry', // Vertical pull
                'ZTQOWAf0v7QmLD5gwAMW', // Horizontal pull
                'kDtgmFeQodOtZz95XRRV', // Horizontal push
                'VeIVmw2kboBdiwHFBfG0', // Carry
                'PGY7HqNN8uNrCkTBWcnc', // Support
                '4pA4Vk86oSQ1sVq3tctW' // Core
            ]
        }));
    }

    public getAll(): Observable<Preferences[]> {
        this.withUser(user => this.afs.collection<Preferences>(this.collectionPath, ref => ref.where('userId', '==', user.uid)).snapshotChanges().pipe(
            snapshotChangesDocsMap,
            tap(entries => this.updateEntries(entries)),
            take(1)
        )).subscribe();

        return this.entries$.pipe(map(entries => [...entries].sort((a, b) => (a.name > b.name) ? 1 : -1)));
    }

    public getDefaultName(): Observable<string> {
        return this.defaultPreferences$.pipe(map(defaultPreferences => defaultPreferences.name));
    }

    public getDefaultEquipment(): Observable<string[]> {
        return this.defaultPreferences$.pipe(
            map(defaultPreferences => defaultPreferences.equipment)
        );
    }

    public getDefaultExerciseTypes(): Observable<string[]> {
        return this.defaultPreferences$.pipe(
            map(defaultPreferences => defaultPreferences.exerciseTypes)
        );
    }

    public getDefaultExerciseTypeOrder(): Observable<string[]> {
        return this.defaultPreferences$.pipe(
            map(defaultPreferences => defaultPreferences.exerciseTypesOrder)
        );
    }

    public setDefaultEquipment(ids: string[]): void {
        const current = this.defaultPreferences$.getValue();
        current.equipment = ids;
        this.defaultPreferences$.next(current);
    }

    public setDefaultExerciseTypes(ids: string[]): void {
        const current = this.defaultPreferences$.getValue();
        current.exerciseTypes = ids;
        this.defaultPreferences$.next(current);
    }

    public setDefaultExerciseTypeOrder(ids: string[]): void {
        const current = this.defaultPreferences$.getValue();
        current.exerciseTypesOrder = ids;
        this.defaultPreferences$.next(current);
    }
}
