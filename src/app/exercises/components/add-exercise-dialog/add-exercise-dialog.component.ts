import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { Exercise } from '../../models/exercise';

@Component({
  selector: 'pp-add-exercise-dialog',
  templateUrl: './add-exercise-dialog.component.html',
  styleUrls: ['./add-exercise-dialog.component.scss']
})
export class AddExerciseDialogComponent {
  public exercisesToAdd: Exercise[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddExerciseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { exercises$: BehaviorSubject<Exercise[]> }
  ) { }

  public ok(): void {
    this.data.exercises$.next(this.exercisesToAdd.concat(this.data.exercises$.getValue()));
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
