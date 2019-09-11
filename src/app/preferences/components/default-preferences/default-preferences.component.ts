import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipment } from 'src/app/equipment/models/equipment';
import { EquipmentService } from 'src/app/equipment/services/equipment.service';
import { ExerciseTypesService } from 'src/app/exercise-types/services/exercise-types.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ExerciseType } from 'src/app/exercise-types/models/exercise-type';
import { PreferencesService } from 'src/app/program/services/preferences.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'pp-default-preferences',
  templateUrl: './default-preferences.component.html',
  styleUrls: ['./default-preferences.component.scss']
})
export class DefaultPreferencesComponent implements OnInit {
  public equipment$: Observable<Equipment[]>;
  public exerciseTypes$: Observable<ExerciseType[]>;

  constructor(
    private equipmentService: EquipmentService,
    private exerciseTypesService: ExerciseTypesService,
    private preferencesService: PreferencesService
  ) { }

  ngOnInit() {
    this.equipment$ = this.equipmentService.getAll();
    this.exerciseTypes$ = this.exerciseTypesService.getAll();
  }

  public exerciseTypeOrderDrop(event: CdkDragDrop<string[]>): void {
    // this.selectedExerciseTypes$.pipe(map(exerciseTypes => moveItemInArray(exerciseTypes, event.previousIndex, event.currentIndex)), take(1)).subscribe();
    // this.program.applyExerciseTypeOrder();
  }

  public setEquipmentCheckboxValue(checkboxChange: MatCheckboxChange) {
    const checkbox = checkboxChange.source;
    // const control = this.form.get(this.field.key);
    // this.preferencesService.default.exerciseTypes
    // control.setValue(control.value ? control.value : []);
    // control.setValue(checkbox.checked ? [...control.value, checkbox.value] : control.value.filter(id => checkbox.value !== id));
  }

  public setExerciseTypesCheckboxValue(checkboxChange: MatCheckboxChange) {
    const checkbox = checkboxChange.source;
    // const control = this.form.get(this.field.key);
    // this.preferencesService.default.exerciseTypes
    // control.setValue(control.value ? control.value : []);
    // control.setValue(checkbox.checked ? [...control.value, checkbox.value] : control.value.filter(id => checkbox.value !== id));
  }
}
