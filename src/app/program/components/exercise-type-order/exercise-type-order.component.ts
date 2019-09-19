import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../../services/program.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { ExerciseType } from 'src/app/exercise-types/models/exercise-type';
import { PreferencesService } from '../../services/preferences.service';

@Component({
  selector: 'pp-exercise-type-order',
  templateUrl: './exercise-type-order.component.html',
  styleUrls: ['./exercise-type-order.component.scss']
})
export class ExerciseTypeOrderComponent implements OnInit {

  public selectedExerciseTypes$: Observable<ExerciseType[]>;

  constructor(
    private program: ProgramService,
    private preferencesService: PreferencesService
  ) { }

  ngOnInit() {
    this.selectedExerciseTypes$ = this.program.selectedExerciseTypes;
  }

  public trackById(item): string {
    return item.id;
  }

  public exerciseTypeOrderDrop(event: CdkDragDrop<string[]>): void {
    this.selectedExerciseTypes$.pipe(
      tap(exerciseTypes => moveItemInArray(exerciseTypes, event.previousIndex, event.currentIndex)),
      tap(exerciseTypes => this.preferencesService.setExerciseTypeOrder(exerciseTypes.map(x => x.id))),
      take(1)).subscribe();
    this.program.applyExerciseTypeOrder();
  }
}
