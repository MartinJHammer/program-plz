import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipment } from 'src/app/equipment/models/equipment';
import { EquipmentService } from 'src/app/equipment/services/equipment.service';
import { ExerciseTypesService } from 'src/app/exercise-types/services/exercise-types.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ExerciseType } from 'src/app/exercise-types/models/exercise-type';
import { PreferencesService } from 'src/app/program/services/preferences.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'pp-default-preferences',
  templateUrl: './default-preferences.component.html',
  styleUrls: ['./default-preferences.component.scss']
})
export class DefaultPreferencesComponent implements OnInit {
  public equipment$: Observable<Equipment[]>;
  public exerciseTypes$: Observable<ExerciseType[]>;
  public prefferedExerciseTypesInOrder$: Observable<ExerciseType[]>;

  public get preferredEquipmentIds(): string[] {
    return this.preferencesService.getDefaultEquipment();
  }
  public get preferredExerciseTypeIds(): string[] {
    return this.preferencesService.getDefaultExerciseTypes();
  }
  public get preferredExerciseTypeOrderIds(): string[] {
    return this.preferencesService.getDefaultExerciseTypeOrder();
  }

  constructor(
    private equipmentService: EquipmentService,
    private exerciseTypesService: ExerciseTypesService,
    private preferencesService: PreferencesService
  ) { }

  ngOnInit() {
    this.equipment$ = this.equipmentService.getAll();
    this.exerciseTypes$ = this.exerciseTypesService.getAll();
    this.prefferedExerciseTypesInOrder$ = this.exerciseTypesService.prefferedOnlyOrdered;
  }

  public setEquipmentCheckboxValue(checkboxChange: MatCheckboxChange) {
    const checkbox = checkboxChange.source;
    const currentValues = this.preferencesService.getDefaultEquipment();
    const result = checkbox.checked ? [...currentValues, checkbox.value] : currentValues.filter(id => checkbox.value !== id);
    this.preferencesService.setDefaultEquipment(result);
  }

  public setExerciseTypesCheckboxValue(checkboxChange: MatCheckboxChange) {
    const checkbox = checkboxChange.source;
    const currentValues = this.preferencesService.getDefaultExerciseTypes();
    const result = checkbox.checked ? [...currentValues, checkbox.value] : currentValues.filter(id => checkbox.value !== id);
    this.preferencesService.setDefaultExerciseTypes(result);
  }

  public exerciseTypeOrderDrop(event: CdkDragDrop<string[]>): void {
    this.prefferedExerciseTypesInOrder$.pipe(
      take(1),
      tap(exerciseTypes => moveItemInArray(exerciseTypes, event.previousIndex, event.currentIndex)),
      tap(exerciseTypes => this.preferencesService.setDefaultExerciseTypeOrder(exerciseTypes.map(exerciseType => exerciseType.id))),
    ).subscribe();
  }
}
