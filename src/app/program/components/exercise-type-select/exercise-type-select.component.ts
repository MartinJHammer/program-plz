import { Component, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ProgramService } from '../../services/program.service';
import { ExerciseType } from 'src/app/exercise-types/models/exercise-type';
import { MatCheckboxChange, MatCheckbox } from '@angular/material/checkbox';
import { Observable } from 'rxjs';
import { ExerciseTypesService } from 'src/app/exercise-types/services/exercise-types.service';
import { tap, debounceTime, switchMap } from 'rxjs/operators';
import { PreferencesService } from '../../services/preferences.service';

@Component({
  selector: 'pp-exercise-type-select',
  templateUrl: './exercise-type-select.component.html',
  styleUrls: ['./exercise-type-select.component.scss']
})
export class ExerciseTypeSelectComponent implements OnInit, AfterViewInit {
  @ViewChildren(MatCheckbox) public checkboxes !: QueryList<MatCheckbox>;

  public exerciseTypes$: Observable<ExerciseType[]>;

  constructor(
    public program: ProgramService,
    public preferencesService: PreferencesService,
    private exerciseTypesService: ExerciseTypesService,
  ) { }

  ngOnInit() {
    this.exerciseTypes$ = this.exerciseTypesService.prefferedFirst();
  }

  ngAfterViewInit() {
    this.exerciseTypesService.prefferedFirst().pipe(
      debounceTime(0),
      switchMap(() => this.program.selectedExerciseTypes.pipe(
        tap(selectedExerciseTypes => selectedExerciseTypes.forEach(selected => {
          const found = this.checkboxes.find(checkBox => (((checkBox.value) as unknown) as ExerciseType).id === selected.id);
          if (found) {
            found.checked = true;
          }
        })),
      ))
    ).subscribe();
  }

  public trackById(index, item: ExerciseType) {
    return item.id;
  }

  public updateSelectedExercises(event: MatCheckboxChange) {
    const selectedExerciseTypes = this.checkboxes.filter(checkbox => checkbox.checked).map(checkbox => ((checkbox.value) as unknown) as ExerciseType);
    this.preferencesService.setExerciseTypes(selectedExerciseTypes.map(exerciseType => exerciseType.id));
    this.program.selectedExerciseTypes.next(selectedExerciseTypes);
  }

  public selectAllExerciseTypes() {
    const allExerciseTypes = this.checkboxes.map(checkbox => {
      if (!checkbox.checked) {
        checkbox.checked = true;
      }
      return ((checkbox.value) as unknown) as ExerciseType;
    });
    this.program.selectedExerciseTypes.next(allExerciseTypes);
    this.preferencesService.setExerciseTypes(allExerciseTypes.map(exerciseTypes => exerciseTypes.id));
  }

  public deSelectAllExerciseTypes() {
    this.checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    this.program.selectedExerciseTypes.next([]);
    this.preferencesService.setExerciseTypes([]);
  }
}
