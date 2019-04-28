import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { Exercise } from 'src/app/models/exercise';
import { ExerciseType } from 'src/app/models/exercise-type';
import { DatabaseService } from 'src/app/services/database.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { ExerciseTypeService } from 'src/app/services/exercise-type.service';
import { FieldBaseComponent } from '../../field-base/field-base.component';

@Component({
  selector: 'pp-multi-select-field',
  templateUrl: './multi-select-field.component.html',
  styleUrls: ['./multi-select-field.component.scss']
})
export class MultiSelectFieldComponent extends FieldBaseComponent implements OnInit {

  public exerciseTypes$: Observable<ExerciseType[]>;

  constructor(
    private exerciseTypeService: ExerciseTypeService,
  ) { super(); }

  ngOnInit() {
    super.ngOnInit();
    this.exerciseTypes$ = this.exerciseTypeService.getAll();
  }

  public setCheckboxValue(checkboxField) {
    const checkbox = checkboxField.target;
    const control = this.form.get('exerciseTypes');
    control.setValue(checkbox.checked ? [...control.value, checkbox.value] : control.value.filter(id => checkbox.value !== id));
  }
}
