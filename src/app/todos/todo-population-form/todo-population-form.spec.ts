import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AddTodoModalComponent } from './todo-population-form';

describe('AddTodoModalComponent', () => {
  let component: AddTodoModalComponent;
  let fixture: ComponentFixture<AddTodoModalComponent>;
  let dialogRefMock: jasmine.SpyObj<MatDialogRef<AddTodoModalComponent>>;
  let snackBarMock: jasmine.SpyObj<MatSnackBar>;
  const mockDialogData = {
    todo: {
      name: 'Existing Todo',
      description: 'Existing Description',
      isComplete: false,
    },
  };

  beforeEach(async () => {
    const dialogSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    const snackSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [AddTodoModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogSpy },
        { provide: MatSnackBar, useValue: snackSpy },
        {
          provide: MAT_DIALOG_DATA,
          useValue: mockDialogData,
          isEditing: false,
        },
      ],
      imports: [MatSnackBarModule],
    }).compileComponents();

    dialogRefMock = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<AddTodoModalComponent>
    >;
    snackBarMock = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    fixture = TestBed.createComponent(AddTodoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog on cancel', () => {
    component.onCancel();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('should save the todo if name is defined', () => {
    component.newTodo = {
      name: 'Test Todo',
      description: '',
      isComplete: false,
    };
    component.onSaveTodo();
    expect(dialogRefMock.close).toHaveBeenCalledWith(component.newTodo);
  });

  it('should initialize newTodo with default values', () => {
    expect(component.newTodo).toEqual({
      name: '',
      description: '',
      isComplete: false,
    });
  });

  it('should initialize newTodo with existing Todo values when data is provided', () => {
    const existingTodo = {
      name: 'Existing Todo',
      description: 'Some description',
      isComplete: true,
    };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      declarations: [AddTodoModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MatSnackBar, useValue: snackBarMock },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { todo: existingTodo, isEditing: true },
        },
      ],
    });

    fixture = TestBed.createComponent(AddTodoModalComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.newTodo).toEqual(existingTodo);
  });

  it('should call dialogRef.close with newTodo when onSaveTodo is called and has a name', () => {
    component.newTodo = {
      name: 'Test Todo',
      description: '',
      isComplete: false,
    };

    component.onSaveTodo();

    expect(dialogRefMock.close).toHaveBeenCalledWith(component.newTodo);
  });

  it('should show snackBar when onSaveTodo is called and name is empty', () => {
    component.newTodo = { name: '', description: '', isComplete: false };

    component.onSaveTodo();

    expect(snackBarMock.open).toHaveBeenCalledWith(
      'Todo not saved, name is not defined',
      '',
      { duration: 2000 }
    );
  });

  it('should call dialogRef.close when onCancel is called', () => {
    component.onCancel();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });
});
