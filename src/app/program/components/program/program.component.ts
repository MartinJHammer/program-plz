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
  public loading: boolean;
  private exerciseTypesList: MatSelect;
  @ViewChild('exerciseTypesList') set content(exerciseTypesList: MatSelect) {
    this.exerciseTypesList = exerciseTypesList;
  }
  // Move to exercise component


  constructor(
    public program: ProgramService,
    public dialog: MatDialog,
    public auth: AuthService,
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

  public selectAllExerciseTypes() {
    this.exerciseTypesList.options.forEach(x => x.select());
    this.program.selectAllExerciseTypes();
  }

  public deSelectAllExerciseTypes() {
    this.exerciseTypesList.options.forEach(x => x.deselect());
    this.program.deSelectAllExerciseTypes();
  }

  public shuffleExercises(): void {
    this.program.shuffleExercises();
  }

  public applyExerciseTypeOrder(): void {
    this.program.applyExerciseTypeOrder();
  }

  public trackById(item): string {
    return item.id;
  }

  public addExercises(): void {
    this.dialog.open(AddExerciseDialogComponent, { minWidth: '250px' });
  }
}
