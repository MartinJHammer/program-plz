import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProgramService } from 'src/app/program/services/program.service';
import { Exercise } from 'src/app/exercises/models/exercise';

@Component({
  selector: 'pp-add-exercise-dialog',
  templateUrl: './add-exercise-dialog.component.html',
  styleUrls: ['./add-exercise-dialog.component.scss']
})
export class AddExerciseDialogComponent {
  public exercisesToAdd: Exercise[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddExerciseDialogComponent>,
    public program: ProgramService
  ) { }

  public ok(): void {
    this.program.exercises$.next(this.exercisesToAdd.concat(this.program.exercises$.getValue()));
    this.exercisesToAdd = [];
    this.dialogRef.close();
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public addToAdding(exercise: Exercise) {
    this.exercisesToAdd.push(new Exercise(exercise));
  }

  public removeFromAdding(exercise: Exercise) {
    this.exercisesToAdd = this.exercisesToAdd.filter(x => x.id !== exercise.id);
  }
}
