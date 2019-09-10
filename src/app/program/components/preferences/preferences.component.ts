import { Component, OnInit } from '@angular/core';
import { PreferencesService } from '../../services/preferences.service';
import { EquipmentService } from 'src/app/equipment/services/equipment.service';

@Component({
  selector: 'pp-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  constructor(
    private service: PreferencesService,
    private equipmentService: EquipmentService
  ) { }

  ngOnInit() {
    // TODO: If no preferences exists, go with a default one.
  }

}
