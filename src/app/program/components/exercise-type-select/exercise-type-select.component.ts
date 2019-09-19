import { Component, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ProgramService } from '../../services/program.service';
import { ExerciseType } from 'src/app/exercise-types/models/exercise-type';
import { MatCheckboxChange, MatCheckbox } from '@angular/material/checkbox';
import { Observable } from 'rxjs';
import { ExerciseTypesService } from 'src/app/exercise-types/services/exercise-types.service';
import { take, tap, debounceTime } from 'rxjs/operators';

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
    private exerciseTypesService: ExerciseTypesService,
  ) { }

  ngOnInit() {
    this.exerciseTypes$ = this.exerciseTypesService.prefferedFirst().pipe(take(1));
  }

  ngAfterViewInit() {
    this.program.selectedExerciseTypes.pipe(
      debounceTime(0),
      tap(selectedExerciseTypes => selectedExerciseTypes.forEach(selected => {
        const found = this.checkboxes.find(checkBox => (((checkBox.value) as unknown) as ExerciseType).id === selected.id);
        if (found) {
          found.checked = true;
        }
      })),
    ).subscribe();
  }

  public updateSelectedExercises(event: MatCheckboxChange) {
    this.program.selectedExerciseTypes.next(this.checkboxes.filter(checkbox => checkbox.checked).map(checkbox => ((checkbox.value) as unknown) as ExerciseType));
  }

  public selectAllExerciseTypes() {
    this.program.selectedExerciseTypes.next(this.checkboxes.map(checkbox => {
      if (!checkbox.checked) {
        checkbox.checked = true;
      }
      return ((checkbox.value) as unknown) as ExerciseType;
    }));
  }

  public deSelectAllExerciseTypes() {
    this.checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    this.program.selectedExerciseTypes.next([]);
  }
}
