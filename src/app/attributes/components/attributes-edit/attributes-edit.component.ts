import { Component, OnInit } from '@angular/core';
import { AttributesFields } from '../../attributes-fields';
import { AttributesService } from '../../services/attributes.service';

@Component({
  selector: 'pp-attributes-edit',
  templateUrl: './attributes-edit.component.html',
  styleUrls: ['./attributes-edit.component.scss']
})
export class AttributesEditComponent implements OnInit {
  constructor(
    public fields: AttributesFields,
    public dataService: AttributesService
  ) { }
  ngOnInit() { }
}
