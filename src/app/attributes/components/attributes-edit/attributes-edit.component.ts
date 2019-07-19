import { Component, OnInit } from '@angular/core';
import { AttributesFields } from '../../attributes-fields';

@Component({
  selector: 'pp-attributes-edit',
  templateUrl: './attributes-edit.component.html',
  styleUrls: ['./attributes-edit.component.scss']
})
export class AttributesEditComponent implements OnInit {
  constructor(public fields: AttributesFields) { }
  ngOnInit() { }
}
