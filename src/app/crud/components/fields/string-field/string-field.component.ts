import { Component, OnInit } from '@angular/core';
import { FieldBase } from 'src/app/crud/models/field-base';
import { Field } from 'src/app/models/field';

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
