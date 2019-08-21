import { Component, OnInit } from '@angular/core';
import { FieldBase } from '../field-base';
import { Field } from '../../models/field';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'pp-string-field',
  templateUrl: './string-field.component.html',
  styleUrls: ['./string-field.component.scss']
})
export class StringFieldComponent extends FieldBase<Field> implements OnInit {

  constructor() { super(); }

  ngOnInit() {
    super.ngOnInit();
  }

}
