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
  constructor(coalescingResolver: CoalescingComponentFactoryResolver) {
    coalescingResolver.init();
  }
}
