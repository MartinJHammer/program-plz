import { Component, Inject } from '@angular/core';
import { ProgramService } from 'src/app/program/services/program.service';
import { Exercise } from 'src/app/exercises/models/exercise';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'pp-replace-exercise-search',
  templateUrl: './replace-exercise-search.component.html',
  styleUrls: ['./replace-exercise-search.component.scss']
})
export class ReplaceExerciseSearchComponent {
  constructor(
    public program: ProgramService,
    public dialogRef: MatDialogRef<ReplaceExerciseSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { exerciseIndex: number }
  ) {
  }

  public replace(newExercise: Exercise): void {
    this.program.replaceExercise(newExercise, this.data.exerciseIndex);
    this.dialogRef.close();
  }

  public cancel() {
    this.dialogRef.close();
  }
}
