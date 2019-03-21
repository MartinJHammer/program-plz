import { Injectable } from '@angular/core';
import { ExerciseTable } from './tables/exercise-table';

@Injectable({ providedIn: 'root' })
export class Database {
    public exercises: ExerciseTable = new ExerciseTable();
}
