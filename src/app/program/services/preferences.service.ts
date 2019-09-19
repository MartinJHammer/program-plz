import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/start/services/storage.service';
import { Preferences } from '../models/preferences';
import { DataService } from 'src/app/start/services/data-service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/start/services/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { snapshotChangesDocsMap } from 'src/app/start/helpers/snapshot-changes-docs-map';
import { tap, take, map } from 'rxjs/operators';
import { docMap } from 'src/app/start/helpers/doc-map';

@Injectable({ providedIn: 'root' })
export class PreferencesService extends DataService<Preferences> {
    private defaultPlaceHolder = new Preferences({
        name: 'Default',
        userId: 'anon',
        equipment: [],
        exerciseTypes: [],
        exerciseTypesOrder: []
    });
    private defaultPreferences$ = new BehaviorSubject<Preferences>(this.defaultPlaceHolder);

    constructor(
        protected afs: AngularFirestore,
        protected storageService: StorageService,
        protected authService: AuthService
    ) {
        super(afs, storageService, authService, 'preferences');
        this.loadDefaultPreferences();
    }

    // Note: Preferences will always be user related - therefore the method overwrite.
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
        this.updateRemoteDefaultPreferences(current);
    }

    public setDefaultExerciseTypes(ids: string[]): void {
        const current = this.defaultPreferences$.getValue();
        current.exerciseTypes = ids;
        this.updateRemoteDefaultPreferences(current);
    }

    public setDefaultExerciseTypeOrder(ids: string[]): void {
        const current = this.defaultPreferences$.getValue();
        current.exerciseTypesOrder = ids;
        this.updateRemoteDefaultPreferences(current);
    }

    private getDefaultPreferences(): void {
        // Refactor this to get hash-ish value to check if anything has changed
        // before fetching? Unless no local data, then always fetch.
        this.afs.doc<Preferences>(`${this.collectionPath}/anon`).get().pipe(
            docMap,
            tap((defaultPreferences: Preferences) => this.updateLocalDefaultPreferences(defaultPreferences)),
            take(1)
        ).subscribe();
    }

    private updateRemoteDefaultPreferences(defaultPreferences: Preferences) {
        // TODO: Revert changes on error. Remember to show the error!
        this.updateLocalDefaultPreferences(defaultPreferences);
        this.afs.collection<Preferences>(this.collectionPath).doc('anon').set(Object.assign({}, defaultPreferences)).then(docRef => { });
    }

    private updateLocalDefaultPreferences(defaultPreferences: Preferences) {
        this.defaultPreferences$.next(defaultPreferences);
        this.storageService.set('defaultPreferences', defaultPreferences);
    }

    private loadDefaultPreferences() {
        this.storageService.select('defaultPreferences').pipe(
            take(1),
            tap((defaultPreferences: Preferences) => {
                if (!defaultPreferences) {
                    this.getDefaultPreferences();
                }

                this.defaultPreferences$.next(defaultPreferences ? defaultPreferences : this.defaultPlaceHolder);
            })
        ).subscribe();
    }
}
