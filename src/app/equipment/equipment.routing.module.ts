import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EquipmentIndexComponent } from './components/equipment-index/equipment-index.component';
import { EquipmentCreateComponent } from './components/equipment-create/equipment-create.component';
import { EquipmentEditComponent } from './components/equipment-edit/equipment-edit.component';
import { AuthGuard } from '../start/routing/auth.guard';

const routes: Routes = [
  {
    path: '', component: EquipmentIndexComponent, canActivate: [AuthGuard]
  },
  {
    path: 'create', component: EquipmentCreateComponent, canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id', component: EquipmentEditComponent, canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentRoutingModule { }
