import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FieldBase } from '../field-base';
import { SelectField } from '../../models/select-field';
import { MatCheckboxChange } from '@angular/material/checkbox';


@Component({
  selector: 'pp-multi-select-field',
  templateUrl: './multi-select-field.component.html',
  styleUrls: ['./multi-select-field.component.scss']
})
export class MultiSelectFieldComponent extends FieldBase<SelectField<any>> implements OnInit {

  public entries$: Observable<any[]>;

  constructor(
  ) { super(); }

  ngOnInit() {
    super.ngOnInit();
    this.entries$ = this.field.service.getAll();
  }

  public setCheckboxValue(checkboxChange: MatCheckboxChange) {
    const checkbox = checkboxChange.source;
    const control = this.form.get(this.field.key);
    control.setValue(control.value ? control.value : []);
    control.setValue(checkbox.checked ? [...control.value, checkbox.value] : control.value.filter(id => checkbox.value !== id));
  }
}
