import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FieldBase } from '../field-base';
import { SelectField } from '../../models/select-field';
import { ExerciseType } from 'src/app/exercise-types/models/exercise-type';
import { DatabaseService } from 'src/app/start/services/database.service';
import { MatCheckboxChange } from '@angular/material/checkbox';


@Component({
  selector: 'pp-multi-select-field',
  templateUrl: './multi-select-field.component.html',
  styleUrls: ['./multi-select-field.component.scss']
})
export class MultiSelectFieldComponent extends FieldBase<SelectField> implements OnInit {

  public entries$: Observable<ExerciseType[]>;

  constructor(
    private db: DatabaseService<ExerciseType>
  ) { super(); }

  ngOnInit() {
    super.ngOnInit();
    this.entries$ = this.db.getAll(this.field.collection);
  }

  public setCheckboxValue(checkboxChange: MatCheckboxChange) {
    const checkbox = checkboxChange.source;
    const control = this.form.get(this.field.key);
    control.setValue(control.value ? control.value : []);
    control.setValue(checkbox.checked ? [...control.value, checkbox.value] : control.value.filter(id => checkbox.value !== id));
  }
}
