import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathEnums } from './shared/enums/path.enum';

const routes: Routes = [
  {
    path: PathEnums.TOODS,
    loadChildren: () =>
      import('./todos/todos.module').then((m) => m.TodosScreenModule),
  },
  {
    path: '**',
    redirectTo: PathEnums.TOODS,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
