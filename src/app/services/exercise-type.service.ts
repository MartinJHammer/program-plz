import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from './database.service';
import { shareReplay } from 'rxjs/operators';
import { ExerciseType } from '../models/exercise-type';

@Injectable({ providedIn: 'root' })
export class ExerciseTypeService {
    private cache$: Observable<ExerciseType[]>;

    constructor(private db: DatabaseService) { }

    public getAll() {
        if (!this.cache$) {
            this.cache$ = this.get().pipe(
                shareReplay(1)
            );
        }

        return this.cache$;
    }

    private get(): Observable<ExerciseType[]> {
        return this.db.getAll<ExerciseType>('exercise-types');
    }
}
