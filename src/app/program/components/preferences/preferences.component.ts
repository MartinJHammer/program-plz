import { Component, OnInit } from '@angular/core';
import { PreferencesService } from '../../services/preferences.service';
import { Preferences } from '../../models/preferences';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map, switchMap, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'pp-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  public preferences$: Observable<Preferences[]>;
  public currentPreferenceName$ = new BehaviorSubject<string>('');
  public preferencesChanged$: Observable<boolean>;

  constructor(
    private service: PreferencesService,
  ) { }

  ngOnInit() {
    this.preferencesChanged$ = this.service.getPreferencesChanged().pipe(
      switchMap(changed => this.service.getSelectedPreferenceId().pipe(
        filter(x => !!x && x !== 'anon'),
        map(() => changed)
      ))
    );

    this.preferences$ = combineLatest(
      this.service.getAll(),
      this.service.getPreferencesId()
    ).pipe(
      map(([allPreferences, currentId]) => {
        return allPreferences.filter(pref => {
          if (pref.id !== currentId) {
            return true;
          }
          this.currentPreferenceName$.next(pref.name);
          return false;
        });
      })
    );
  }

  public selectPreference(preferences: Preferences) {
    this.service.selectPreference(preferences.id);
  }

  public save(): void {
    this.service.saveCurrentPreferenceChanges();
  }

  public discard(): void {
    this.service.discardCurrentPreferenceChanges();
  }

  public newPreference(): void {

  }
}
