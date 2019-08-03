import { Component, OnInit, Input } from '@angular/core';
import { Entry } from 'src/app/start/models/entry';

@Component({
  selector: 'pp-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  @Input() public entry: Entry;
  @Input() public identifier: string;

  constructor() { }

  ngOnInit() {
  }

}
