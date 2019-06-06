import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DatabaseService } from 'src/app/services/database.service';
import { FieldBaseComponent } from '../../field-base/field-base.component';
import { SelectField } from 'src/app/models/select-field';
import { Entry } from 'src/app/models/entry';

@Component({
  selector: 'pp-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent extends FieldBaseComponent<SelectField> implements OnInit {

  public entries$: Observable<Entry[]>;

  constructor(
    private db: DatabaseService<Entry>
  ) { super(); }

  ngOnInit() {
    super.ngOnInit();
    this.entries$ = this.db.getAll(this.field.collection);
  }
}
