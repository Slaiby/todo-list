import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TodosLandingComponent } from './todos-landing/todos-landing.component';
import { TodosScreenRoutingModule } from './todos.routing.module';
import { TodosService } from '../shared/services/todos.service';
import { CommonModule } from '@angular/common';
import { TodosDisplayComponent } from './todos-display/todos-display.component';
import { AddTodoModalComponent } from './todo-population-form/todo-population-form';
import { TodosConfirmationForm } from './todo-confirmation-form/todo-confirmation-form';

@NgModule({
  declarations: [
    TodosLandingComponent,
    TodosDisplayComponent,
    AddTodoModalComponent,
    TodosConfirmationForm,
  ],
  imports: [CommonModule, SharedModule, TodosScreenRoutingModule],
  exports: [],
  providers: [TodosService],
})
export class TodosScreenModule {}
