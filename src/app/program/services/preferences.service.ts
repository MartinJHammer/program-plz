import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/start/services/storage.service';
import { Preferences } from '../models/preferences';
import { DataService } from 'src/app/start/services/data-service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/start/services/auth.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { snapshotChangesDocsMap } from 'src/app/start/helpers/snapshot-changes-docs-map';
import { tap, take, map, filter, scan, } from 'rxjs/operators';
import { toBehaviorSubject } from 'src/app/start/helpers/to-behavior-subject';

@Injectable({ providedIn: 'root' })
export class PreferencesService extends DataService<Preferences> {

    private selectedPreferenceId$: BehaviorSubject<string>;
    private placeHolderPreference$: BehaviorSubject<Preferences>;
    private preferencesChanged$ = new BehaviorSubject<boolean>(false);

    constructor(
        protected afs: AngularFirestore,
        protected storageService: StorageService,
        protected authService: AuthService
    ) {
        super(afs, storageService, authService, 'preferences');
        this.initPreferences();
    }

    public selectPreference(preferencesId: string): void {
        this.selectedPreferenceId$.next(preferencesId);
        this.storageService.set('selectedPreferenceId', preferencesId);
        this.placeHolderPreference$ = toBehaviorSubject(this.getSingle(preferencesId).pipe(
            map(x => new Preferences(JSON.parse(JSON.stringify(x)))) // Clone preferences so original isn't affected
        ), null);
    }

    // Note: Preferences will always be user related - therefore the method overwrite.
    public getAll(): Observable<Preferences[]> {
        this.withUser(user => combineLatest(
            this.getSingle('anon').pipe(filter(x => !!x), take(1), map(x => [x])),
            this.afs.collection<Preferences>(this.collectionPath, ref => ref.where('userId', '==', user.uid)).snapshotChanges().pipe(snapshotChangesDocsMap)
        ).pipe(
            map(([a, b]) => a.concat(b), []),
            tap(entries => this.updateEntries(entries)),
            take(1)
        )).subscribe();

        return this.entries$.pipe(
            map(entries => [...entries].sort((a, b) => (a.name > b.name) ? 1 : -1)),
        );
    }

    public getPreferencesId(): Observable<string> {
        return this.placeHolderPreference$.pipe(
            filter(x => !!x),
            map(preferences => preferences.id)
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
        this.preferencesChanged$.next(true);
        const current = this.placeHolderPreference$.getValue();
        current.equipment = ids;
        this.updateSingleEntryInEntries(current);
    }

    public setExerciseTypes(ids: string[]): void {
        this.preferencesChanged$.next(true);
        const current = this.placeHolderPreference$.getValue();
        current.exerciseTypes = ids;
        this.updateSingleEntryInEntries(current);
    }

    public setExerciseTypeOrder(ids: string[]): void {
        this.preferencesChanged$.next(true);
        const current = this.placeHolderPreference$.getValue();
        current.exerciseTypesOrder = ids;
        this.updateSingleEntryInEntries(current);
    }

    private initPreferences(): void {
        this.selectedPreferenceId$ = toBehaviorSubject<string>(this.storageService.select('selectedPreferenceId'), 'anon');
        this.selectPreference(this.selectedPreferenceId$.getValue());
    }
}
