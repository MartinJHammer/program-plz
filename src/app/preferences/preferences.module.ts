import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components, entryComponents } from './components/components';
import { CoalescingComponentFactoryResolver } from '../start/services/coalescing-component-factory-resolver.service';
import { PreferencesRoutingModule } from './preferences.routing.module';
import { UiModule } from '../ui/ui.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UtilitiesModule } from '../utilities/utilities.module';

@NgModule({
  imports: [
    CommonModule,
    PreferencesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    UtilitiesModule
  ],
  declarations: [
    ...components
  ],
  entryComponents: [
    ...entryComponents
  ],
  exports: [
    ...components
  ]
})
export class PreferencesModule {
  constructor(
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver
  ) {
    coalescingResolver.registerResolver(localResolver);
  }
}
