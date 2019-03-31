import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from '../models/exercise';
import { DatabaseService } from './database.service';
import { shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ExerciseService {
    private cache$: Observable<Exercise[]>;

    constructor(private db: DatabaseService) { }

    public getAll() {
        if (!this.cache$) {
            this.cache$ = this.get().pipe(
                shareReplay(1)
            );
        }

        return this.cache$;
    }

    private get(): Observable<Exercise[]> {
        return this.db.getAll<Exercise>('exercises');
    }
}
