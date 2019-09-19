import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/start/services/storage.service';
import { Preferences } from '../models/preferences';
import { DataService } from 'src/app/start/services/data-service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/start/services/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { snapshotChangesDocsMap } from 'src/app/start/helpers/snapshot-changes-docs-map';
import { tap, take, map, filter, switchMap } from 'rxjs/operators';
import { toBehaviorSubject } from 'src/app/start/helpers/to-behavior-subject';

@Injectable({ providedIn: 'root' })
export class PreferencesService extends DataService<Preferences> {

    private selectedPreferenceId$: BehaviorSubject<string>;
    private placeHolderPreference$: BehaviorSubject<Preferences>;

    constructor(
        protected afs: AngularFirestore,
        protected storageService: StorageService,
        protected authService: AuthService
    ) {
        super(afs, storageService, authService, 'preferences');

        // get selected preference id
        this.selectedPreferenceId$ = toBehaviorSubject<string>(this.storageService.select('selectedPreferenceId'), 'anon');
        this.selectPreference(this.selectedPreferenceId$.getValue());
        this.getSingle('anon').pipe(tap(x => console.log(x))).subscribe();
    }

    public selectPreference(preferencesId: string): void {
        this.selectedPreferenceId$.next(preferencesId);
        this.storageService.set('selectedPreferenceId', preferencesId);
        this.placeHolderPreference$ = toBehaviorSubject(this.getSingle(preferencesId), null);
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

    public getPreferencesName(): Observable<string> {
        return this.placeHolderPreference$.pipe(
            filter(x => !!x),
            map(preferences => preferences.name)
        );
    }

    public getEquipment(): Observable<string[]> {
        return this.placeHolderPreference$.pipe(
            filter(x => !!x),
            map(preferences => preferences.equipment)
        );
    }

    public getExerciseTypes(): Observable<string[]> {
        return this.placeHolderPreference$.pipe(
            filter(x => !!x),
            map(preferences => preferences.exerciseTypes)
        );
    }

    public getExerciseTypeOrder(): Observable<string[]> {
        return this.placeHolderPreference$.pipe(
            filter(x => !!x),
            map(preferences => preferences.exerciseTypesOrder)
        );
    }

    public setEquipment(ids: string[]): void {
        const current = this.placeHolderPreference$.getValue();
        current.equipment = ids;
        this.updateSingleEntryInEntries(current);
    }

    public setExerciseTypes(ids: string[]): void {
        const current = this.placeHolderPreference$.getValue();
        current.exerciseTypes = ids;
        this.updateSingleEntryInEntries(current);
    }

    public setExerciseTypeOrder(ids: string[]): void {
        const current = this.placeHolderPreference$.getValue();
        current.exerciseTypesOrder = ids;
        this.updateSingleEntryInEntries(current);
    }

    private getPlaceHolderPref(): Observable<Preferences> {
        return this.selectedPreferenceId$.pipe(
            switchMap(selectedPreferenceId => this.entries$.pipe(
                map(entries => entries.find(entry => entry.id === selectedPreferenceId))
            ))
        );
    }
}
