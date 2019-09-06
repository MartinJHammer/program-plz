import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { StorageService } from 'src/app/start/services/storage.service';
import { Preferences } from '../models/preferences';

@Injectable({ providedIn: 'root' })
export class PreferencesService {
    // START HERE: Make this into a dataservice and make the crud flow. No typical crud ui needed though.
    private preferences$: BehaviorSubject<Preferences[]>;

    constructor(
        private storageService: StorageService
    ) {
        this.loadFromStorage();
    }

    private loadFromStorage() {
        this.storageService.select('preferences').pipe(
            take(1),
            tap((x: Preferences[]) => {
                this.preferences$.next(x);
            })
        ).subscribe();
    }
}
