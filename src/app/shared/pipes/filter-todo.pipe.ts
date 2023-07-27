import { Pipe, PipeTransform } from '@angular/core';
import { Todos } from '../interfaces/todos-models';

@Pipe({ name: 'filterTodo' })
export class FilterTodoPipe implements PipeTransform {
  transform(todo: Todos[], showWhen: boolean): Todos[] {
    return todo.filter((task: Todos) => task.isComplete === showWhen);
  }
}
