import { Component } from '@angular/core';
import { EquipmentService } from '../../services/equipment.service';

@Component({
  selector: 'pp-equipment-index',
  templateUrl: './equipment-index.component.html',
  styleUrls: ['./equipment-index.component.scss']
})
export class EquipmentIndexComponent {
  constructor(
    public dataService: EquipmentService
  ) { }
}
