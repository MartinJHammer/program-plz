import { Component } from '@angular/core';
import { AttributesService } from '../../services/attributes.service';

@Component({
  selector: 'pp-attributes',
  templateUrl: './attributes-index.component.html',
  styleUrls: ['./attributes-index.component.scss']
})
export class AttributesIndexComponent {
  constructor(
    public dataService: AttributesService
  ) { }
}
