import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from 'src/app/exercises/models/exercise';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/ui/components/dialog/dialog.component';
import { ProgramService } from '../../services/program.service';
import { tap, map, take } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'pp-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {
  @Input() public exercise: Exercise;
  @Input() public index: number;
  public loading: boolean;
  public dragExercises: boolean;

  constructor(
    public program: ProgramService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  public exerciseInfo(exercise: Exercise): void {
    this.dialog.open(DialogComponent, {
      minWidth: '250px',
      data: {
        title: `${exercise.name} information`,
        body: `More information wil be added soon!`
      }
    } as MatDialogConfig);
  }

  public removeExercise(selectedExercise: Exercise): void {
    this.dialog.open(DialogComponent, {
      minWidth: '250px',
      data: {
        title: `Are you sure you want to remove ${selectedExercise.name}`,
        body: 'Remember you can add it again via the "Add" option.',
        logic: () => { this.program.removeExercise(selectedExercise) }
      }
    } as MatDialogConfig);
  }

  public toggleDragExercises(): void {
    this.dragExercises = !this.dragExercises;
  }

  public exerciseDrop(event: CdkDragDrop<string[]>): void {
    this.program.exercises$.pipe(map(exercises => moveItemInArray(exercises, event.previousIndex, event.currentIndex)), take(1)).subscribe();
  }

  public exerciseTypeOrderDrop(event: CdkDragDrop<string[]>): void {
    this.program.selectedExerciseTypes$.pipe(map(exerciseTypes => moveItemInArray(exerciseTypes, event.previousIndex, event.currentIndex)), take(1)).subscribe();
  }

  /**
   * Replaces an exercise in the program with another exercise.
   * Exercise is of same difficulty and targets same muscles
   */
  public differentVersion(exercise: Exercise, exerciseIndex: number): void {
    this.loading = true;
    this.program.differentVersion(exercise, exerciseIndex).pipe(
      tap(() => this.loading = false)
    ).subscribe();
  }
}
