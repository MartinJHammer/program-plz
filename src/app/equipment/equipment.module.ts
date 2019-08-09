import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentRoutingModule } from './equipment.routing.module';
import { components, entryComponents } from './components/components';
import { CrudModule } from '../crud/crud.module';
import { SearchModule } from '../search/search.module';
import { CoalescingComponentFactoryResolver } from '../start/services/coalescing-component-factory-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    CrudModule,
    EquipmentRoutingModule,
    SearchModule
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
export class EquipmentModule {
  constructor(
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver
  ) {
    coalescingResolver.registerResolver(localResolver);
  }
}
