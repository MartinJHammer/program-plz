import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../../field-base/field-base.component';

@Component({
  selector: 'pp-hidden-field',
  templateUrl: './hidden-field.component.html',
  styleUrls: ['./hidden-field.component.scss']
})
export class HiddenFieldComponent extends FieldBaseComponent implements OnInit {

  constructor() { super(); }

  ngOnInit() {
    super.ngOnInit();
  }

}
