import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiRoutingModule } from './ui.routing.module';
import { CoalescingComponentFactoryResolver } from '../services/coalescing-component-factory-resolver.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { components, entryComponents } from './components/components';

const material = [
  FlexLayoutModule,
  ScrollDispatchModule,
  DragDropModule,
  MatSelectModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatCheckboxModule,
];

@NgModule({
  imports: [
    CommonModule,
    UiRoutingModule,
    ...material
  ],
  declarations: [
    ...components
  ],
  entryComponents: [
    ...entryComponents
  ],
  exports: [
    ...components,
    ...material
  ]
})
export class UiModule {
  constructor(
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver
  ) {
    coalescingResolver.registerResolver(localResolver);
  }
}