import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'pp-exercise-types',
  templateUrl: './exercise-types-index.component.html',
  styleUrls: ['./exercise-types-index.component.scss']
})
export class ExerciseTypesIndexComponent implements OnInit {

  public exerciseTypes: Observable<Exercise[]>;

  constructor(public db: AngularFirestore) { }

  ngOnInit() {
    this.exerciseTypes = this.db.collection<Exercise>('exercise-types').snapshotChanges().pipe(
      map(docs => docs.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Exercise;
      }))
    );
  }

  public delete(exercise: Exercise) {
    this.db.doc(`exercise-types/${exercise.id}`).delete();
  }
}
