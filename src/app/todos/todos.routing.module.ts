import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosLandingComponent } from './todos-landing/todos-landing.component';

const routes: Routes = [
  {
    path: '',
    component: TodosLandingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodosScreenRoutingModule {}
