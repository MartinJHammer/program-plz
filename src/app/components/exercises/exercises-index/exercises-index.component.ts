import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CrudService } from 'src/app/crud/crud.service';

@Component({
  selector: 'pp-exercises',
  templateUrl: './exercises-index.component.html',
  styleUrls: ['./exercises-index.component.scss']
})
export class ExercisesIndexComponent {
  constructor(
    public afs: AngularFirestore,
    public crudService: CrudService
  ) {
  }
}
