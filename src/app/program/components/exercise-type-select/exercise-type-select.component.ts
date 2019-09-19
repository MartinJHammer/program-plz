import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { ProgramService } from '../../services/program.service';
import { ExerciseType } from 'src/app/exercise-types/models/exercise-type';
import { MatCheckboxChange, MatCheckbox } from '@angular/material/checkbox';
import { Observable } from 'rxjs';
import { ExerciseTypesService } from 'src/app/exercise-types/services/exercise-types.service';
import { tap, debounceTime } from 'rxjs/operators';
import { PreferencesService } from '../../services/preferences.service';
import { SubscriptionHandler } from 'src/app/start/helpers/subscription-handler';

@Component({
  selector: 'pp-exercise-type-select',
  templateUrl: './exercise-type-select.component.html',
  styleUrls: ['./exercise-type-select.component.scss']
})
export class ExerciseTypeSelectComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren(MatCheckbox) public checkboxes !: QueryList<MatCheckbox>;

  public exerciseTypes$: Observable<ExerciseType[]>;
  public subscriptionHandler = new SubscriptionHandler();

  constructor(
    public program: ProgramService,
    public preferencesService: PreferencesService,
    private exerciseTypesService: ExerciseTypesService,
  ) { }

  ngOnInit() {
    this.exerciseTypes$ = this.exerciseTypesService.prefferedFirst();
  }

  ngAfterViewInit() {
    const sub = this.exerciseTypesService.prefferedOnly().pipe(
      debounceTime(0),
      tap(selectedExerciseTypes => this.checkboxes.forEach(checkBox => {
        const found = selectedExerciseTypes.find(selectedExerciseType => selectedExerciseType.id === (((checkBox.value) as unknown) as ExerciseType).id);
        found ? checkBox.checked = true : checkBox.checked = false;
      }))
    ).subscribe();

    this.subscriptionHandler.register(sub);
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public trackById(index, item: ExerciseType) {
    return item.id;
  }

  public updateSelectedExerciseTypes(event: MatCheckboxChange) {
    const selectedExerciseTypes = this.checkboxes.filter(checkbox => checkbox.checked).map(checkbox => ((checkbox.value) as unknown) as ExerciseType);
    this.preferencesService.setExerciseTypes(selectedExerciseTypes.map(exerciseType => exerciseType.id));
  }

  public selectAllExerciseTypes() {
    const allExerciseTypes = this.checkboxes.map(checkbox => {
      if (!checkbox.checked) {
        checkbox.checked = true;
      }
      return ((checkbox.value) as unknown) as ExerciseType;
    });
    this.preferencesService.setExerciseTypes(allExerciseTypes.map(exerciseTypes => exerciseTypes.id));
  }

  public deSelectAllExerciseTypes() {
    this.checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    this.preferencesService.setExerciseTypes([]);
  }
}
