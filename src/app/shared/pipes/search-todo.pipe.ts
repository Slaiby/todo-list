import { Pipe, PipeTransform } from '@angular/core';
import { Todos } from '../interfaces/todos-models';

@Pipe({
  name: 'searchByName',
})
export class SearchByName implements PipeTransform {
  transform(todoListData: Todos[], filterByName: string): Todos[] {
    if (!filterByName) {
      return todoListData;
    }
    return todoListData.filter((todo: Todos) =>
      todo.name.toLowerCase().includes(filterByName.toLowerCase())
    );
  }
}
