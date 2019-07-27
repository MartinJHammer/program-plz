import { Component, OnInit, ViewChild } from '@angular/core';
import { map, take, tap } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatSelect } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { ProgramService } from '../../services/program.service';
import { AddExerciseDialogComponent } from '../add-exercise-dialog/add-exercise-dialog.component';

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

  public shuffleExercises(): void {
    this.program.shuffleExercises();
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

  public applyExerciseTypeOrder(): void {
    this.program.applyExerciseTypeOrder();
  }

  public exerciseTypeOrderDrop(event: CdkDragDrop<string[]>): void {
    this.program.selectedExerciseTypes$.pipe(map(exerciseTypes => moveItemInArray(exerciseTypes, event.previousIndex, event.currentIndex)), take(1)).subscribe();
  }
}
