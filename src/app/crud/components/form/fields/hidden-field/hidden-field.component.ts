import { Component, OnInit, Input } from '@angular/core';
import { Field } from 'src/app/models/field';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'pp-hidden-field',
  templateUrl: './hidden-field.component.html',
  styleUrls: ['./hidden-field.component.scss']
})
export class HiddenFieldComponent implements OnInit {

  @Input() public field: Field;
  @Input() public form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
