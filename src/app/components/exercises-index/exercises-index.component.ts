import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'program-plz-exercises',
  templateUrl: './exercises-index.component.html',
  styleUrls: ['./exercises-index.component.scss']
})
export class ExerciseIndexComponent implements OnInit {

  public exercises: Observable<Exercise[]>;

  constructor(public db: AngularFirestore) { }

  ngOnInit() {
    this.exercises = this.db.collection<Exercise>('exercises').valueChanges();
  }
}
