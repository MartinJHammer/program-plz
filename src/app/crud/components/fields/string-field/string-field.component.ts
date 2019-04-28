import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../../field-base/field-base.component';

@Component({
  selector: 'pp-string-field',
  templateUrl: './string-field.component.html',
  styleUrls: ['./string-field.component.scss']
})
export class StringFieldComponent extends FieldBaseComponent implements OnInit {

  constructor() { super(); }

  ngOnInit() {
    super.ngOnInit();
  }

}
