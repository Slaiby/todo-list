import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { TodosLandingComponent } from './todos-landing.component';
import { TodosService } from 'src/app/shared/services/todos.service';
import { of } from 'rxjs';
import { Todos } from 'src/app/shared/interfaces/todos-models';

describe('TodosLandingComponent', () => {
  let component: TodosLandingComponent;
  let fixture: ComponentFixture<TodosLandingComponent>;
  let todosService: jasmine.SpyObj<TodosService>;

  beforeEach(() => {
    const mockTodosService = jasmine.createSpyObj('TodosService', ['getTodos']);

    TestBed.configureTestingModule({
      declarations: [TodosLandingComponent],
      providers: [{ provide: TodosService, useValue: mockTodosService }],
    });

    fixture = TestBed.createComponent(TodosLandingComponent);
    component = fixture.componentInstance;
    todosService = TestBed.inject(TodosService) as jasmine.SpyObj<TodosService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with isLoading set to true', () => {
    expect(component.isLoading).toBeTrue();
  });

  it('should fetch todosList on ngOnInit and set isLoading to false', fakeAsync(() => {
    const mockTodosList: Todos[] = [
      { id: 1, name: 'Todo 1', description: '', isComplete: false },
    ];

    todosService.getTodos.and.returnValue(of(mockTodosList));

    component.ngOnInit();
    tick();

    expect(component.isLoading).toBeFalse();
    expect(component.todosList).toEqual(mockTodosList);
  }));

  it('should update todosList when handleTodoChanges is called', () => {
    const mockUpdatedTodos: Todos[] = [
      { id: 1, name: 'Updated Todo', description: '', isComplete: true },
    ];

    component.handleTodoChanges(mockUpdatedTodos);

    expect(component.todosList).toEqual(mockUpdatedTodos);
  });
});
