import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/start/services/storage.service';
import { Preferences } from '../models/preferences';
import { DataService } from 'src/app/start/services/data-service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/start/services/auth.service';
import { Observable } from 'rxjs';
import { snapshotChangesDocsMap } from 'src/app/start/helpers/snapshot-changes-docs-map';
import { tap, take, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PreferencesService extends DataService<Preferences> {
    // TODO: Make this something that exists in the DB
    private default: Preferences;


    constructor(
        protected afs: AngularFirestore,
        protected storageService: StorageService,
        protected authService: AuthService
    ) {
        super(afs, storageService, authService, 'preferences');
        this.default = new Preferences({
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
        });
    }

    public getAll(): Observable<Preferences[]> {
        this.withUser(user => this.afs.collection<Preferences>(this.collectionPath, ref => ref.where('userId', '==', user.uid)).snapshotChanges().pipe(
            snapshotChangesDocsMap,
            tap(entries => this.updateEntries(entries)),
            take(1)
        )).subscribe();

        return this.entries$.pipe(map(entries => [...entries].sort((a, b) => (a.name > b.name) ? 1 : -1)));
    }

    public getDefaultName(): string {
        return this.default.name;
    }

    public getDefaultEquipment(): string[] {
        return this.default.equipment;
    }

    public getDefaultExerciseTypes(): string[] {
        return this.default.exerciseTypes;
    }

    public getDefaultExerciseTypeOrder(): string[] {
        return this.default.exerciseTypesOrder;
    }

    public setDefaultEquipment(ids: string[]): void {
        this.default.equipment = ids;
    }

    public setDefaultExerciseTypes(ids: string[]): void {
        this.default.exerciseTypes = ids;
    }

    public setDefaultExerciseTypeOrder(ids: string[]): void {
        this.default.exerciseTypesOrder = ids;
    }
}
