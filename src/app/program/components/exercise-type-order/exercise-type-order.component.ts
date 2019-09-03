import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../../services/program.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ExerciseType } from 'src/app/exercise-types/models/exercise-type';

@Component({
  selector: 'pp-exercise-type-order',
  templateUrl: './exercise-type-order.component.html',
  styleUrls: ['./exercise-type-order.component.scss']
})
export class ExerciseTypeOrderComponent implements OnInit {

  public selectedExerciseTypes$: Observable<ExerciseType[]>;

  constructor(
    public program: ProgramService
  ) { }

  ngOnInit() {
    this.selectedExerciseTypes$ = this.program.selectedExerciseTypes;
  }

  public trackById(item): string {
    return item.id;
  }

  public exerciseTypeOrderDrop(event: CdkDragDrop<string[]>): void {
    this.selectedExerciseTypes$.pipe(map(exerciseTypes => moveItemInArray(exerciseTypes, event.previousIndex, event.currentIndex)), take(1)).subscribe();
    this.program.applyExerciseTypeOrder();
  }
}
