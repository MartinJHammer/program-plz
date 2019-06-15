import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { Exercise } from 'src/app/models/exercise';
import { ExerciseType } from 'src/app/models/exercise-type';
import { DatabaseService } from 'src/app/services/database.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { FieldBaseComponent } from '../../field-base/field-base.component';
import { SelectField } from 'src/app/models/select-field';

@Component({
  selector: 'pp-multi-select-field',
  templateUrl: './multi-select-field.component.html',
  styleUrls: ['./multi-select-field.component.scss']
})
export class MultiSelectFieldComponent extends FieldBaseComponent<SelectField> implements OnInit {

  public entries$: Observable<ExerciseType[]>;

  constructor(
    private db: DatabaseService<ExerciseType>
  ) { super(); }

  ngOnInit() {
    super.ngOnInit();
    this.entries$ = this.db.getAll(this.field.collection);
  }

  public setCheckboxValue(checkboxField) {
    const checkbox = checkboxField.target;
    const control = this.form.get(this.field.key);
    control.setValue(control.value ? control.value : []);
    control.setValue(checkbox.checked ? [...control.value, checkbox.value] : control.value.filter(id => checkbox.value !== id));
  }
}
