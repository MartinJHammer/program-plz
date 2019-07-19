import { Component, OnInit } from '@angular/core';
import { AttributesFields } from '../../attributes-fields';

@Component({
  selector: 'pp-attributes-create',
  templateUrl: './attributes-create.component.html',
  styleUrls: ['./attributes-create.component.scss']
})
export class AttributesCreateComponent implements OnInit {
  constructor(public fields: AttributesFields) { }
  ngOnInit() { }
}
