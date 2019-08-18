import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { map, take } from 'rxjs/operators';
import { ProgramService } from '../../services/program.service';
import { Exercise } from 'src/app/exercises/models/exercise';
import { Observable } from 'rxjs';

@Component({
  selector: 'pp-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {

  public exercises$: Observable<Exercise[]>;

  constructor(
    public program: ProgramService
  ) { }

  ngOnInit() {
    this.exercises$ = this.program.getExercises$();
  }

  public trackById(item): string {
    return item.id;
  }

  public exerciseDrop(event: CdkDragDrop<string[]>): void {
    this.program.getExercises$().pipe(
      take(1),
      map(exercises => {
        moveItemInArray(exercises, event.previousIndex, event.currentIndex);
        this.program.updateProgram(exercises);
      })
    ).subscribe();
  }

}
