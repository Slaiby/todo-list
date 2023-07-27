import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Todos } from 'src/app/shared/interfaces/todos-models';
import { TodosService } from 'src/app/shared/services/todos.service';
import { AddTodoModalComponent } from '../todo-population-form/todo-population-form';
import { TodosConfirmationForm } from '../todo-confirmation-form/todo-confirmation-form';

@Component({
  selector: 'app-todos-display',
  templateUrl: './todos-display.component.html',
  styleUrls: ['./todos-display.component.sass'],
})
export class TodosDisplayComponent {
  todoListData: Todos[] = [];
  filterByName: string = '';

  @Output() todosListChange = new EventEmitter<Todos[]>();
  @Input() set todosList(data: Todos[]) {
    if (data?.length) {
      this.todoListData = data;
    }
  }

  constructor(private todosService: TodosService, private dialog: MatDialog) {}

  filterEntryFromList(entry: Todos): Todos[] {
    return this.todoListData.filter(
      (element: Todos) => element.id !== entry.id
    );
  }

  handleTodoClick(todo: Todos) {
    const mutatedTodo = { ...todo, isComplete: !todo.isComplete };
    this.todosService
      .mutateTodo(todo, mutatedTodo)
      .subscribe((response: Todos) => {
        this.todosListChange.emit([
          ...this.filterEntryFromList(todo),
          response,
        ]);
      });
  }

  confirmationDelete(
    $event: { stopPropagation: () => void },
    todo: Todos
  ): void {
    $event.stopPropagation();
    const dialogRef = this.dialog.open(TodosConfirmationForm, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((response) => {
      response &&
        this.todosService.deleteTodo(todo).subscribe((response: Todos) => {
          this.todosListChange.emit([
            ...this.filterEntryFromList(todo),
            response,
          ]);
        });
    });
  }

  handleAddButtonClick(): void {
    const dialogRef = this.dialog.open(AddTodoModalComponent, {
      width: '350px',
      data: { isEditing: false },
    });
    dialogRef.afterClosed().subscribe((newTodo) => {
      !!newTodo &&
        this.todosService.addTodo(newTodo).subscribe((response: Todos) => {
          this.todosListChange.emit([...this.todoListData, response]);
        });
    });
  }

  editModal($event: { stopPropagation: () => void }, todo: Todos): void {
    $event.stopPropagation();
    const dialogRef = this.dialog.open(AddTodoModalComponent, {
      width: '350px',
      data: { todo, isEditing: true },
    });
    dialogRef.afterClosed().subscribe((updatedTodo) => {
      !!updatedTodo &&
        this.todosService
          .updateTodo(updatedTodo)
          .subscribe((response: Todos) => {
            this.todosListChange.emit([
              ...this.filterEntryFromList(todo),
              response,
            ]);
          });
    });
  }
}
