import { Component, OnInit } from '@angular/core';
import { take, tap, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ProgramService } from '../../services/program.service';
import { AddExerciseDialogComponent } from '../add-exercise-dialog/add-exercise-dialog.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'pp-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
  public loading: boolean;
  public dragExercises: boolean;

  constructor(
    public program: ProgramService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.program.loadPreferences();
  }

  public createProgram(): void {
    const toggleLoading = () => this.loading = !this.loading;
    toggleLoading();
    this.program.plz().pipe(
      tap(() => toggleLoading()),
      take(1)
    ).subscribe();
  }

  public trackById(item): string {
    return item.id;
  }

  public addExercises(): void {
    this.dialog.open(AddExerciseDialogComponent, { minWidth: '250px' });
  }

  public toggleDragExercises(): void {
    this.dragExercises = !this.dragExercises;
  }

  public exerciseDrop(event: CdkDragDrop<string[]>): void {
    this.program.exercises$.pipe(map(exercises => moveItemInArray(exercises, event.previousIndex, event.currentIndex)), take(1)).subscribe();
  }

}
