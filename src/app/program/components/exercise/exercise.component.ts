import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from 'src/app/exercises/models/exercise';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/ui/components/dialog/dialog.component';
import { ProgramService } from '../../services/program.service';
import { tap } from 'rxjs/operators';
import { ReplaceExerciseSearchComponent } from '../replace-exercise-search/replace-exercise-search.component';

@Component({
  selector: 'pp-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {
  @Input() public exercise: Exercise;
  @Input() public index: number;
  public loading: boolean;

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
        body: exercise.description,
        html: true
      }
    } as MatDialogConfig);
  }

  public removeExercise(selectedExercise: Exercise): void {
    this.dialog.open(DialogComponent, {
      minWidth: '250px',
      data: {
        title: `Are you sure you want to remove ${selectedExercise.name}`,
        body: 'Remember you can add it again via the "Add" option.',
        logic: () => { this.program.removeExercise(selectedExercise); }
      }
    } as MatDialogConfig);
  }

  public replaceWithRandom(exercise: Exercise, exerciseIndex: number): void {
    this.loading = true;
    this.program.replaceWithRandom(exercise, exerciseIndex).pipe(
      tap(() => this.loading = false)
    ).subscribe();
  }

  public replaceWithSearch(exerciseIndex: number): void {
    this.dialog.open(ReplaceExerciseSearchComponent, {
      minWidth: '250px',
      data: {
        exerciseIndex
      }
    } as MatDialogConfig);
  }
}
