import { Component, OnInit } from '@angular/core';
import { EquipmentFields } from '../../equipment-fields';

@Component({
  selector: 'pp-equipment-edit',
  templateUrl: './equipment-edit.component.html',
  styleUrls: ['./equipment-edit.component.scss']
})
export class EquipmentEditComponent implements OnInit {
  constructor(public fields: EquipmentFields) { }
  ngOnInit() { }
}
