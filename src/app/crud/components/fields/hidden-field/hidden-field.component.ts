import { Component, OnInit } from '@angular/core';
import { Field } from 'src/app/models/field';
import { FieldBase } from 'src/app/crud/models/field-base';

@Component({
  selector: 'pp-hidden-field',
  templateUrl: './hidden-field.component.html',
  styleUrls: ['./hidden-field.component.scss']
})
export class HiddenFieldComponent extends FieldBase<Field> implements OnInit {

  constructor() { super(); }

  ngOnInit() {
    super.ngOnInit();
  }

}
