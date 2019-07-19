import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../start/routing/auth.guard';
import { AttributesIndexComponent } from './components/attributes-index/attributes-index.component';
import { AttributesCreateComponent } from './components/attributes-create/attributes-create.component';
import { AttributesEditComponent } from './components/attributes-edit/attributes-edit.component';

const routes: Routes = [
  {
    path: '', component: AttributesIndexComponent, canActivate: [AuthGuard]
  },
  {
    path: 'create', component: AttributesCreateComponent, canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id', component: AttributesEditComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributesRoutingModule { }
