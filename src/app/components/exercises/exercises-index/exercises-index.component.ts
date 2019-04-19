import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CrudComponent } from 'src/app/crud/crud-component';
import { CrudService } from 'src/app/crud/crud.service';

@Component({
  selector: 'pp-exercises',
  templateUrl: './exercises-index.component.html',
  styleUrls: ['./exercises-index.component.scss']
})
export class ExercisesIndexComponent extends CrudComponent {

  // #############################
  // NEXT: Move infinte scroll logic into crud/db service.
  // -> make delete work
  // -> make edit work
  // -> make crud html reusable
  // -> implement on exercise type
  // #############################

  constructor(
    public afs: AngularFirestore,
    public crudService: CrudService
  ) {
    super(crudService, afs);
  }
}
