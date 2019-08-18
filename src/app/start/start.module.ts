import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';

import { ServiceWorkerModule } from '@angular/service-worker';
import { StartRoutingModule } from './start-routing.module';
import { CrudModule } from '../crud/crud.module';
import { components } from './components/components';
import { StartComponent } from './components/start/start.component';
import { CoalescingComponentFactoryResolver } from './services/coalescing-component-factory-resolver.service';
import { UiModule } from '../ui/ui.module';
import { StorageService } from './services/storage.service';
import { Exercise } from '../exercises/models/exercise';
import { from, timer, BehaviorSubject } from 'rxjs';
import { tap, map, switchMap, filter, delay, take } from 'rxjs/operators';

@NgModule({
  imports: [
    BrowserModule,
    StartRoutingModule,
    ReactiveFormsModule,
    CrudModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    UiModule,
    // PWA
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    ...components,
  ],
  bootstrap: [StartComponent]
})
export class StartModule {
  constructor(
    coalescingResolver: CoalescingComponentFactoryResolver,
    public storageService: StorageService
  ) {
    coalescingResolver.init();

    // Starting up the app
    const program$ = new BehaviorSubject<any[]>([]);

    // Get program from last session
    storageService.select('program').pipe(
      take(1),
      tap(x => program$.next(x)),
    ).subscribe();

    setTimeout(() => {
      // Change is made to program.
      const updatedProgram = program$.getValue().concat([
        new Exercise({
          name: 'Squat',
          description: 'So good!',
          equipmentIds: [
            '123',
            '234'
          ],
          exerciseTypeId: '123'
        })
      ]);

      program$.next(updatedProgram);
      this.storageService.set('program', updatedProgram);
    }, 5000);

    setTimeout(() => {
      // Change is made to program.
      const updatedProgram = program$.getValue().concat([
        new Exercise({
          name: 'Deadlift',
          description: 'So good!',
          equipmentIds: [
            '123',
            '234'
          ],
          exerciseTypeId: '123'
        })
      ]);
      program$.next(updatedProgram);
      this.storageService.set('program', updatedProgram);
    }, 10000);

    setTimeout(() => {
      // Change is made to program.
      const updatedProgram = program$.getValue().concat([
        new Exercise({
          name: 'Bench press',
          description: 'So good!',
          equipmentIds: [
            '123',
            '234'
          ],
          exerciseTypeId: '123'
        })
      ]);
      program$.next(updatedProgram);
      this.storageService.set('program', updatedProgram);
    }, 15000);

    // Persist program whenever it changes.
    program$.pipe(
      tap(program => console.log(program)),
    ).subscribe();
  }
}
