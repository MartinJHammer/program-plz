import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'program-plz-exercises',
  templateUrl: './exercises-index.component.html',
  styleUrls: ['./exercises-index.component.scss']
})
export class ExercisesIndexComponent implements OnInit {

  public exercises: Observable<Exercise[]>;

  constructor(public db: AngularFirestore) { }

  ngOnInit() {
    this.exercises = this.db.collection<Exercise>('exercises').snapshotChanges().pipe(
      map(docs => docs.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Exercise;
      }))
    );
  }

  public delete(exercise: Exercise) {
    this.db.doc(`exercises/${exercise.id}`).delete();
  }
}
