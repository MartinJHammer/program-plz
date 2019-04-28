import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../../field-base/field-base.component';
import { Field } from 'src/app/models/field';

@Component({
  selector: 'pp-string-field',
  templateUrl: './string-field.component.html',
  styleUrls: ['./string-field.component.scss']
})
export class StringFieldComponent extends FieldBaseComponent<Field> implements OnInit {

  constructor() { super(); }

  ngOnInit() {
    super.ngOnInit();
  }

}
