import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Exercise } from '../models/exercise';
import { DatabaseService } from './database.service';
import { shareReplay, map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ExerciseService {
    private cache$: Observable<Exercise[]>;

    constructor(private db: DatabaseService<Exercise>) { }

    public get(): Observable<Exercise[]> {
        return this.db.get('exercises');
    }

    public getAll(): Observable<Exercise[]> {
        if (!this.cache$) {
            this.cache$ = this.db.getAll('exercises').pipe(
                shareReplay(1)
            );
        }
        return this.cache$;
    }

    public getSingle(id: string): Observable<Exercise> {
        // If the cache isn't defined, return a standard NgFire observable
        if (!this.cache$) {
            return this.db.getSingle('exercises', id);
        }

        // When the cache has been defined, use it first to look up existing ones.
        return this.cache$.pipe(switchMap(values => {
            const found = values.find(value => value.id === id);
            if (found) {
                return of(found);
            } else {
                return this.db.getSingle('exercises', id);
            }
        }));
    }
}
