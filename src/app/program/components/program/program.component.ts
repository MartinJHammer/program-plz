import { Component, OnInit, ViewChild } from '@angular/core';
import { map, take, tap } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatSelect } from '@angular/material/select';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/ui/components/dialog/dialog.component';
import { AddExerciseDialogComponent } from 'src/app/exercises/components/add-exercise-dialog/add-exercise-dialog.component';
import { Exercise } from 'src/app/exercises/models/exercise';
import { ProgramService } from '../../services/program.service';
import { AuthService } from 'src/app/start/services/auth.service';

@Component({
  selector: 'pp-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
  public loading = false;
  private exerciseTypesList: MatSelect;
  @ViewChild('exerciseTypesList') set content(exerciseTypesList: MatSelect) {
    this.exerciseTypesList = exerciseTypesList;
  }

  // Move to exercise component
  public dragExercises = false;

  constructor(
    public program: ProgramService,
    public auth: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.program.loadPreferences();
  }

  public createProgram(): void {
    this.toggleLoading();
    this.program.plz().pipe(
      tap(() => this.toggleLoading()),
      take(1)
    ).subscribe();
  }

  public selectAllExerciseTypes() {
    this.exerciseTypesList.options.forEach(x => x.select());
    this.program.selectAllExerciseTypes();
  }

  public deSelectAllExerciseTypes() {
    this.exerciseTypesList.options.forEach(x => x.deselect());
    this.program.deSelectAllExerciseTypes();
  }

  public toggleDragExercises(): void {
    this.dragExercises = !this.dragExercises;
  }

  public shuffleExercises(): void {
    this.program.shuffleExercises();
  }

  public toggleLoading(): void {
    this.loading = !this.loading;
  }

  public applyExerciseTypeOrder(): void {
    this.program.applyExerciseTypeOrder();
  }

  public trackById(item): string {
    return item.id;
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
    this.program.differentVersion(exercise, exerciseIndex);
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

  public addExercises(): void {
    this.dialog.open(AddExerciseDialogComponent, { minWidth: '250px' });
  }

  public removeExercise(selectedExercise: Exercise): void {
    this.dialog.open(DialogComponent, {
      minWidth: '250px',
      data: {
        title: `Are you sure you want to remove ${selectedExercise.name}`,
        body: 'Remember you can add it again via the "Add" option.',
        logic: () => {
          this.program.exercises$.pipe(
            take(1),
            map(exercises => {
              this.program.exercises$.next(exercises.filter(exercise => exercise.id !== selectedExercise.id));
            }),
          ).subscribe();
        }
      }
    } as MatDialogConfig);
  }
}
