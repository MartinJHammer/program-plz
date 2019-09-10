import { Component, OnInit } from '@angular/core';
import { PreferencesService } from '../../services/preferences.service';
import { Preferences } from '../../models/preferences';
import { Observable } from 'rxjs';

@Component({
  selector: 'pp-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  public preferences$: Observable<Preferences[]>;

  public get default(): Preferences {
    return this.service.default;
  }

  constructor(
    private service: PreferencesService,
  ) {
    this.preferences$ = this.service.getAll();
  }

  ngOnInit() { }
}
