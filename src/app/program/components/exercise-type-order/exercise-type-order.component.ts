import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../../services/program.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'pp-exercise-type-order',
  templateUrl: './exercise-type-order.component.html',
  styleUrls: ['./exercise-type-order.component.scss']
})
export class ExerciseTypeOrderComponent implements OnInit {

  constructor(
    public program: ProgramService
  ) { }

  ngOnInit() {
  }



  public exerciseTypeOrderDrop(event: CdkDragDrop<string[]>): void {
    this.program.selectedExerciseTypes$.pipe(map(exerciseTypes => moveItemInArray(exerciseTypes, event.previousIndex, event.currentIndex)), take(1)).subscribe();
  }

  public applyExerciseTypeOrder(): void {
    this.program.applyExerciseTypeOrder();
  }
}
