import { Component, OnInit, Input } from '@angular/core';
import { Entry } from 'src/app/models/entry';
import { CrudService } from '../../crud.service';
import { AngularFirestore } from '@angular/fire/firestore';

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

  constructor(
    public crudService: CrudService,
    public afs: AngularFirestore
  ) { }

  ngOnInit() {
  }

  public openDeleteModal(currentEntry: Entry): void {
    this.currentEntry = currentEntry;
    $(() => {
      $('#deleteModal').modal('show');
    });
  }

  public closeDeleteModal(): void {
    $('#deleteModal').modal('hide');
  }

  public delete(currentEntry): void {
    this.afs.doc(`${this.collectionName}/${currentEntry.id}`).delete();
    $('#deleteModal').modal('hide');
  }
}
