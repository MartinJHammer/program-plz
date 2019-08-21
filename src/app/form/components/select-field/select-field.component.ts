import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FieldBase } from '../field-base';
import { SelectField } from '../../models/select-field';
import { Entry } from 'src/app/start/models/entry';

@Component({
  selector: 'pp-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent extends FieldBase<SelectField<any>> implements OnInit {

  public entries$: Observable<Entry[]>;

  constructor(
  ) { super(); }

  ngOnInit() {
    super.ngOnInit();
    this.entries$ = this.field.service.getAll();
  }
}
