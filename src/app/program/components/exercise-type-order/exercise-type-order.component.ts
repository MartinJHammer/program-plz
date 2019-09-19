import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../../services/program.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { ExerciseType } from 'src/app/exercise-types/models/exercise-type';
import { PreferencesService } from '../../services/preferences.service';
import { ExerciseTypesService } from 'src/app/exercise-types/services/exercise-types.service';

@Component({
  selector: 'pp-exercise-type-order',
  templateUrl: './exercise-type-order.component.html',
  styleUrls: ['./exercise-type-order.component.scss']
})
export class ExerciseTypeOrderComponent implements OnInit {

  public selectedExerciseTypes$: Observable<ExerciseType[]>;

  constructor(
    private program: ProgramService,
    private preferencesService: PreferencesService,
    private exerciseTypesService: ExerciseTypesService
  ) { }

  ngOnInit() {
    this.selectedExerciseTypes$ = this.exerciseTypesService.prefferedOnlyOrdered();
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
