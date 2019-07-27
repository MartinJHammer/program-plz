import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { map, take } from 'rxjs/operators';
import { ProgramService } from '../../services/program.service';

@Component({
  selector: 'pp-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {
  constructor(
    public program: ProgramService
  ) { }

  ngOnInit() {
  }

  public trackById(item): string {
    return item.id;
  }

  public exerciseDrop(event: CdkDragDrop<string[]>): void {
    this.program.exercises$.pipe(map(exercises => moveItemInArray(exercises, event.previousIndex, event.currentIndex)), take(1)).subscribe();
  }

}
