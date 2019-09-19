import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipment } from 'src/app/equipment/models/equipment';
import { EquipmentService } from 'src/app/equipment/services/equipment.service';
import { ExerciseTypesService } from 'src/app/exercise-types/services/exercise-types.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ExerciseType } from 'src/app/exercise-types/models/exercise-type';
import { PreferencesService } from 'src/app/program/services/preferences.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { map, take, tap, share } from 'rxjs/operators';

@Component({
  selector: 'pp-default-preferences',
  templateUrl: './default-preferences.component.html',
  styleUrls: ['./default-preferences.component.scss']
})
export class DefaultPreferencesComponent implements OnInit {
  public equipment$: Observable<Equipment[]>;
  public exerciseTypes$: Observable<ExerciseType[]>;
  public preferredEquipmentIds$: Observable<string[]>;
  public preferredExerciseTypeIds$: Observable<string[]>;
  public prefferedExerciseTypesInOrder$: Observable<ExerciseType[]>;

  constructor(
    private equipmentService: EquipmentService,
    private exerciseTypesService: ExerciseTypesService,
    private preferencesService: PreferencesService
  ) { }

  ngOnInit() {
    this.equipment$ = this.equipmentService.getAll();
    this.exerciseTypes$ = this.exerciseTypesService.getAll();
    this.preferredEquipmentIds$ = this.preferencesService.getDefaultEquipment();
    this.preferredExerciseTypeIds$ = this.preferencesService.getDefaultExerciseTypes();
    this.prefferedExerciseTypesInOrder$ = this.exerciseTypesService.prefferedOnlyOrdered();
  }

  public setEquipmentCheckboxValue(checkboxChange: MatCheckboxChange) {
    const checkbox = checkboxChange.source;

    this.preferencesService.getDefaultEquipment().pipe(
      take(1),
      tap(currentValues => {
        const result = checkbox.checked ? [...currentValues, checkbox.value] : currentValues.filter(id => checkbox.value !== id);
        this.preferencesService.setDefaultEquipment(result);
      })
    ).subscribe();
  }

  public setExerciseTypesCheckboxValue(checkboxChange: MatCheckboxChange) {
    const checkbox = checkboxChange.source;
    this.preferencesService.getDefaultExerciseTypes().pipe(
      take(1),
      tap(currentValues => {
        const result = checkbox.checked ? [...currentValues, checkbox.value] : currentValues.filter(id => checkbox.value !== id);
        this.preferencesService.setDefaultExerciseTypes(result);
      })
    ).subscribe();
  }

  public exerciseTypeOrderDrop(event: CdkDragDrop<string[]>): void {
    this.prefferedExerciseTypesInOrder$.pipe(
      take(1),
      tap(exerciseTypes => moveItemInArray(exerciseTypes, event.previousIndex, event.currentIndex)),
      tap(exerciseTypes => this.preferencesService.setDefaultExerciseTypeOrder(exerciseTypes.map(exerciseType => exerciseType.id))),
    ).subscribe();
  }
}
