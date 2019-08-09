import { Component, OnInit } from '@angular/core';
import { EquipmentFields } from '../../equipment-fields';

@Component({
  selector: 'pp-equipment-create',
  templateUrl: './equipment-create.component.html',
  styleUrls: ['./equipment-create.component.scss']
})
export class EquipmentCreateComponent implements OnInit {
  constructor(public fields: EquipmentFields) { }
  ngOnInit() { }
}
