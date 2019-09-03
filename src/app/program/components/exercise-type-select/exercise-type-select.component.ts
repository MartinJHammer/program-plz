import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ProgramService } from '../../services/program.service';
import { ExerciseType } from 'src/app/exercise-types/models/exercise-type';
import { MatCheckboxChange, MatCheckbox } from '@angular/material/checkbox';
import { Observable } from 'rxjs';

@Component({
  selector: 'pp-exercise-type-select',
  templateUrl: './exercise-type-select.component.html',
  styleUrls: ['./exercise-type-select.component.scss']
})
export class ExerciseTypeSelectComponent implements OnInit {
  @ViewChildren(MatCheckbox) public checkboxes !: QueryList<MatCheckbox>;

  public allExerciseTypes$: Observable<ExerciseType[]>;

  constructor(
    public program: ProgramService
  ) { }

  ngOnInit() {
    this.allExerciseTypes$ = this.program.exerciseTypes;
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
