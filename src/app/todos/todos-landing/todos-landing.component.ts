import { Component, OnInit } from '@angular/core';
import { Todos } from 'src/app/shared/interfaces/todos-models';
import { TodosService } from 'src/app/shared/services/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos-landing.component.html',
  styleUrls: ['./todos-landing.component.sass'],
})
export class TodosLandingComponent implements OnInit {
  todosList: Todos[] = [];
  isLoading: boolean = true;
  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.getTodoList();
  }

  getTodoList() {
    this.isLoading = true;
    this.todosService.getTodos().subscribe((response: Todos[]) => {
      this.todosList = response;
      this.isLoading = false;
    });
  }

  handleTodoChanges(updatedTodos: Todos[]) {
    this.todosList = updatedTodos;
  }
}
