import { Component, OnInit, Input } from '@angular/core';
import { Entry } from 'src/app/models/entry';

declare var $: any;

@Component({
  selector: 'pp-crud-index',
  templateUrl: './crud-index.component.html',
  styleUrls: ['./crud-index.component.scss']
})
export class CrudIndexComponent implements OnInit {

  @Input() public collectionName: string;
  @Input() public identifier: string;

  public currentEntry: Entry;

  constructor() { }

  ngOnInit() {
  }

  public setCurrentEntry(currentEntry: Entry) {
    this.currentEntry = currentEntry;
  }

  public deleteEntry(currentEntry: Entry): void {
    this.currentEntry = currentEntry;
    $(() => {
      $('#deleteModal').modal('show');
    });
  }

  public closeDeleteModal(): void {
    $('#deleteModal').modal('hide');
  }
}
