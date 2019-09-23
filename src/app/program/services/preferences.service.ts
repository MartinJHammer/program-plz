import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/start/services/storage.service';
import { Preferences } from '../models/preferences';
import { DataService } from 'src/app/start/services/data-service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/start/services/auth.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { snapshotChangesDocsMap } from 'src/app/start/helpers/snapshot-changes-docs-map';
import { tap, take, map, filter, switchMap, startWith } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PreferencesService extends DataService<Preferences> {

    private selectedPreferenceId$ = new BehaviorSubject<string>('');
    private placeHolderPreference$ = new BehaviorSubject<Preferences>(null);
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
        this.preferencesChanged$.next(false);
        this.getSingle(preferencesId).pipe(
            map(x => new Preferences(JSON.parse(JSON.stringify(x)))), // Clone preferences so original isn't affected
            map(x => this.placeHolderPreference$.next(x)),
            take(1)
        ).subscribe();
    }

    public getPlaceholderPreference(): Observable<Preferences> {
        return this.placeHolderPreference$;
    }

    public getPreferencesChanged(): Observable<boolean> {
        return this.preferencesChanged$;
    }

    public saveCurrentPreferenceChanges(): void {
        this.update(this.placeHolderPreference$.getValue());
        this.preferencesChanged$.next(false);
    }

    public discardCurrentPreferenceChanges(): void {
        this.selectPreference(this.selectedPreferenceId$.getValue());
    }

    public newPreference(preferenceName): void {
        this.placeHolderPreference$.pipe(
            take(1),
            switchMap(placeholderPref => {
                delete placeholderPref.id;
                placeholderPref.name = preferenceName;
                return this.add(placeholderPref).pipe(
                    take(1),
                    tap(newPreferenceId => this.selectPreference(newPreferenceId)));
            }),
            tap(() => this.preferencesChanged$.next(false))
        ).subscribe();
    }

    // Note: Preferences will always be user related - therefore the method overwrite.
    public getAll(): Observable<Preferences[]> {
        this.withUser(user => combineLatest([
            this.getSingle('anon').pipe(filter(x => !!x), take(1), map(x => [x])),
            this.afs.collection<Preferences>(this.collectionPath, ref => ref.where('userId', '==', user.uid)).snapshotChanges().pipe(snapshotChangesDocsMap)
        ]).pipe(
            map(([a, b]) => a.concat(b), []),
            tap(entries => this.updateEntries(entries)),
            take(1)
        )).subscribe();

        return this.entries$.pipe(
            map(entries => [...entries].sort((a, b) => (a.name > b.name) ? 1 : -1))
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
        const current = Object.assign({}, this.placeHolderPreference$.getValue());
        current.equipment = ids;
        this.placeHolderPreference$.next(current);
    }

    public setExerciseTypes(ids: string[]): void {
        this.preferencesChanged$.next(true);
        const current = Object.assign({}, this.placeHolderPreference$.getValue());
        current.exerciseTypes = ids;
        this.placeHolderPreference$.next(current);
    }

    public setExerciseTypeOrder(ids: string[]): void {
        this.preferencesChanged$.next(true);
        const current = Object.assign({}, this.placeHolderPreference$.getValue());
        current.exerciseTypesOrder = ids;
        this.placeHolderPreference$.next(current);
    }

    private initPreferences(): void {
        const selectedPreferenceId$ = this.storageService.select('selectedPreferenceId');
        selectedPreferenceId$.pipe(
            take(1),
            map(selectedPreferenceId => !!selectedPreferenceId ? selectedPreferenceId : 'anon'),
            tap(selectedPreferenceId => this.selectPreference(selectedPreferenceId))
        ).subscribe();
    }
}
