import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { ProgramService } from '../../services/program.service';
import { MatSelect } from '@angular/material/select';
import { ExerciseType } from 'src/app/exercise-types/models/exercise-type';
import { MatCheckboxChange, MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'pp-exercise-type-select',
  templateUrl: './exercise-type-select.component.html',
  styleUrls: ['./exercise-type-select.component.scss']
})
export class ExerciseTypeSelectComponent implements OnInit {
  public selectedExerciseTypes: ExerciseType[] = [];
  @ViewChildren(MatCheckbox) public checkboxes !: QueryList<MatCheckbox>;

  constructor(
    public program: ProgramService
  ) { }

  ngOnInit() {
  }

  public updateSelectedExercises(event: MatCheckboxChange) {
    this.selectedExerciseTypes.push(((event.source.value as unknown) as ExerciseType));
    this.program.selectedExerciseTypes$.next(this.selectedExerciseTypes);
  }

  public selectAllExerciseTypes() {
    this.checkboxes.filter(checkbox => !checkbox.checked).forEach(checkbox => {
      checkbox.checked = true;
      this.selectedExerciseTypes.push(((checkbox.value as unknown) as ExerciseType));
    });
    this.program.selectedExerciseTypes$.next(this.selectedExerciseTypes);
  }

  public deSelectAllExerciseTypes() {
    this.checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    this.selectedExerciseTypes = [];
    this.program.selectedExerciseTypes$.next(this.selectedExerciseTypes);
  }
}
