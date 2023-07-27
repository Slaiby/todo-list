import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { TodosService } from 'src/app/shared/services/todos.service';
import { TodosDisplayComponent } from './todos-display.component';
import { of } from 'rxjs';
import { Todos } from 'src/app/shared/interfaces/todos-models';
import { SearchByName } from 'src/app/shared/pipes/search-todo.pipe';
import { FilterTodoPipe } from 'src/app/shared/pipes/filter-todo.pipe';
import { AddTodoModalComponent } from '../todo-population-form/todo-population-form';

// Mock TodosService
class TodosServiceMock {
  mutateTodo(todo: Todos, mutatedTodo: Todos) {
    return of(mutatedTodo);
  }

  deleteTodo(todo: Todos) {
    return of(todo);
  }

  addTodo(newTodo: Todos) {
    return of(newTodo);
  }

  updateTodo(newTodo: Todos) {
    return of(newTodo);
  }
}

class MatDialogMock {
  open(component: any, config: any) {
    if (component === AddTodoModalComponent) {
      if (config?.width === '350px' && config?.data?.todo) {
        return { afterClosed: () => of(config.data.todo) };
      }
    }
    return { afterClosed: () => of({}) };
  }
}

describe('TodosDisplayComponent', () => {
  let component: TodosDisplayComponent;
  let fixture: ComponentFixture<TodosDisplayComponent>;
  let todosServiceMock: TodosServiceMock;
  let matDialogMock: MatDialogMock;

  beforeEach(async () => {
    todosServiceMock = new TodosServiceMock();
    matDialogMock = new MatDialogMock();

    await TestBed.configureTestingModule({
      declarations: [TodosDisplayComponent, SearchByName, FilterTodoPipe],
      providers: [
        { provide: TodosService, useValue: todosServiceMock },
        { provide: MatDialog, useValue: matDialogMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosDisplayComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open the edit modal and update todo on closing', fakeAsync(() => {
    const dummyTodo: Todos = {
      id: 1,
      description: 'dummy description',
      name: 'New Todo',
      isComplete: false,
    };
    component.todoListData = [dummyTodo];
    const updatedTodo: Todos = { ...dummyTodo, isComplete: true };

    spyOn(matDialogMock, 'open').and.returnValue({
      afterClosed: () => of(updatedTodo),
    });

    spyOn(todosServiceMock, 'updateTodo').and.returnValue(of(updatedTodo));
    spyOn(component.todosListChange, 'emit');

    const event = {
      stopPropagation: () => {},
    };

    component.editModal(event, dummyTodo);
    tick();

    expect(matDialogMock.open).toHaveBeenCalledWith(AddTodoModalComponent, {
      width: '350px',
      data: { todo: dummyTodo, isEditing: true },
    });
    expect(todosServiceMock.updateTodo).toHaveBeenCalledWith(updatedTodo);

    expect(component.todosListChange.emit).toHaveBeenCalledWith([
      ...component.filterEntryFromList(dummyTodo),
      updatedTodo,
    ]);
  }));
});
