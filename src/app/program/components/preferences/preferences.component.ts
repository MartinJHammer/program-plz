import { Component, OnInit } from '@angular/core';
import { PreferencesService } from '../../services/preferences.service';
import { Preferences } from '../../models/preferences';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { DialogComponent } from 'src/app/ui/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'pp-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  public preferences$: Observable<Preferences[]>;
  public currentPreference$ = new BehaviorSubject<Preferences>(null);
  public preferencesChanged$: Observable<boolean>;
  public changedPreferenceAndNotAnon$: Observable<boolean>;

  public creatingPreference: boolean;
  public renamingPreference: boolean;
  private preferenceToRename: Preferences;
  public nameControl: FormControl = new FormControl();
  public validationMessage: string;

  constructor(
    private service: PreferencesService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.preferencesChanged$ = this.service.getPreferencesChanged();

    this.changedPreferenceAndNotAnon$ = this.service.getPreferencesChanged().pipe(
      switchMap(changed => this.service.getPlaceholderPreference().pipe(
        filter(x => !!x && x.id !== 'anon'),
        map(() => changed)
      ))
    );


    this.preferences$ = combineLatest([
      this.service.getAll(),
      this.service.getPlaceholderPreference().pipe(filter(x => !!x))
    ]).pipe(
      map(([allPreferences, placeHolderPref]) => {
        return allPreferences.filter(pref => {
          if (pref.id !== placeHolderPref.id) {
            return true;
          }
          this.currentPreference$.next(pref);
          return false;
        });
      })
    );
  }

  public save(): void {
    this.service.saveCurrentPreferenceChanges();
  }

  public discard(): void {
    this.service.discardCurrentPreferenceChanges();
  }

  public newPreference(): void {
    this.creatingPreference = true;
  }

  public selectPreference(preferences: Preferences) {
    this.service.selectPreference(preferences.id);
  }

  public renamePreference(preferences: Preferences) {
    this.preferenceToRename = preferences;
    this.nameControl.setValue(preferences.name);
    this.renamingPreference = true;
  }

  public deletePreference(preferences: Preferences) {
    this.dialog.open(DialogComponent, {
      data: {
        title: `Delete ${preferences.name} preference?`,
        body: `This cannot be undone`,
        logic: () => this.service.delete(preferences.id)
      }
    });
  }

  public createPreference(): void {
    const preferenceName = this.nameControl.value;
    if (preferenceName && preferenceName.length >= 3) {
      this.validationMessage = undefined;
      this.creatingPreference = false;
      this.nameControl.setValue('');
      this.service.newPreference(preferenceName);
    } else {
      this.validationMessage = 'Please enter a name of 3 characters or more';
    }
  }

  public updatePreference() {
    const preferenceName = this.nameControl.value;
    if (preferenceName && preferenceName.length >= 3) {
      this.validationMessage = undefined;
      this.renamingPreference = false;
      this.nameControl.setValue('');
      this.preferenceToRename.name = preferenceName;
      this.service.update(this.preferenceToRename);
      this.preferenceToRename = undefined;
    } else {
      this.validationMessage = 'Please enter a name of 3 characters or more';
    }
  }

  public cancelForm(): void {
    this.creatingPreference = false;
    this.renamingPreference = false;
    this.nameControl.setValue('');
  }
}
