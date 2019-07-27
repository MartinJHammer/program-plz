import { Component, OnInit, ViewChild } from '@angular/core';
import { ProgramService } from '../../services/program.service';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'pp-exercise-type-select',
  templateUrl: './exercise-type-select.component.html',
  styleUrls: ['./exercise-type-select.component.scss']
})
export class ExerciseTypeSelectComponent implements OnInit {
  private exerciseTypesList: MatSelect;
  @ViewChild('exerciseTypesList') set content(exerciseTypesList: MatSelect) {
    this.exerciseTypesList = exerciseTypesList;
  }

  constructor(
    public program: ProgramService
  ) { }

  ngOnInit() {
  }

  public selectAllExerciseTypes() {
    this.exerciseTypesList.options.forEach(x => x.select());
    this.program.selectAllExerciseTypes();
  }

  public deSelectAllExerciseTypes() {
    this.exerciseTypesList.options.forEach(x => x.deselect());
    this.program.deSelectAllExerciseTypes();
  }
}
