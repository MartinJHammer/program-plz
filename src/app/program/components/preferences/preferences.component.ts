import { Component, OnInit } from '@angular/core';
import { PreferencesService } from '../../services/preferences.service';
import { Preferences } from '../../models/preferences';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map, switchMap, filter, tap, take } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { DialogComponent } from 'src/app/ui/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'pp-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  public preferences$: Observable<Preferences[]>;
  public currentPreferenceName$ = new BehaviorSubject<string>('');
  public preferencesChanged$: Observable<boolean>;
  public creatingPreference: boolean;
  public nameControl: FormControl = new FormControl();
  public validationMessage: string;


  constructor(
    private service: PreferencesService,
    private dialog: MatDialog
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

  public renamePreference(preferences: Preferences) {

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

  public save(): void {
    this.service.saveCurrentPreferenceChanges();
  }

  public discard(): void {
    this.service.discardCurrentPreferenceChanges();
  }

  public newPreference(): void {
    this.creatingPreference = true;
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

  public cancelCreatePreference(): void {
    this.creatingPreference = false;
    this.nameControl.setValue('');
  }
}
