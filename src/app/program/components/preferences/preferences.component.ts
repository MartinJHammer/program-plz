import { Component, OnInit } from '@angular/core';
import { PreferencesService } from '../../services/preferences.service';
import { Preferences } from '../../models/preferences';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'pp-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  public preferences$: Observable<Preferences[]>;
  public currentPreference$ = new BehaviorSubject<string>('');
  public preferencesChanged$: Observable<boolean>;

  constructor(
    private service: PreferencesService,
  ) { }

  ngOnInit() {
    this.preferencesChanged$ = this.service.getPreferencesChanged();

    this.preferences$ = combineLatest(
      this.service.getAll(),
      this.service.getPreferencesId()
    ).pipe(
      map(([allPreferences, currentId]) => {
        return allPreferences.filter(pref => {
          if (pref.id !== currentId) {
            return true;
          }
          this.currentPreference$.next(pref.name);
          return false;
        });
      })
    );
  }
}
