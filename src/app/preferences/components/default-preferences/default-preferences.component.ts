import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
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
    const defaultPreferences = this.preferencesService.getSingle('anon');

    this.preferredEquipmentIds$ = defaultPreferences.pipe(map(preferences => preferences.equipment));
    this.preferredExerciseTypeIds$ = defaultPreferences.pipe(map(preferences => preferences.exerciseTypes));
    const prefferedExerciseTypeOrderIds$ = defaultPreferences.pipe(map(preferences => preferences.exerciseTypesOrder));

    this.prefferedExerciseTypesInOrder$ = combineLatest(
      this.exerciseTypes$,
      this.preferredExerciseTypeIds$,
      prefferedExerciseTypeOrderIds$
    ).pipe(
      map(([exerciseTypes, prefferedOrder, prefferedExerciseTypeOrderIds]) => {
        const prefferedOnly = exerciseTypes.filter(exerciseType => prefferedOrder.includes(exerciseType.id));
        return this.sortExerciseTypes(prefferedOnly, prefferedExerciseTypeOrderIds);
      })
    );
  }

  public setEquipmentCheckboxValue(checkboxChange: MatCheckboxChange) {
    const checkbox = checkboxChange.source;

    this.preferencesService.getEquipment().pipe(
      take(1),
      tap(currentValues => {
        const result = checkbox.checked ? [...currentValues, checkbox.value] : currentValues.filter(id => checkbox.value !== id);
        this.preferencesService.setEquipment(result);
      })
    ).subscribe();
  }

  public setExerciseTypesCheckboxValue(checkboxChange: MatCheckboxChange) {
    const checkbox = checkboxChange.source;
    this.preferencesService.getExerciseTypes().pipe(
      take(1),
      tap(currentValues => {
        const result = checkbox.checked ? [...currentValues, checkbox.value] : currentValues.filter(id => checkbox.value !== id);
        this.preferencesService.setExerciseTypes(result);
      })
    ).subscribe();
  }

  public exerciseTypeOrderDrop(event: CdkDragDrop<string[]>): void {
    this.prefferedExerciseTypesInOrder$.pipe(
      take(1),
      tap(exerciseTypes => moveItemInArray(exerciseTypes, event.previousIndex, event.currentIndex)),
      tap(exerciseTypes => this.preferencesService.setExerciseTypeOrder(exerciseTypes.map(exerciseType => exerciseType.id))),
    ).subscribe();
  }

  private sortExerciseTypes(exerciseTypes: ExerciseType[], prefferedOrder: string[]): any[] {
    return [...exerciseTypes].sort((a, b) => prefferedOrder.indexOf(a.id) - prefferedOrder.indexOf(b.id));
  }
}
