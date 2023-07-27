import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { TodosConfirmationForm } from './todo-confirmation-form';

describe('TodosConfirmationForm', () => {
  let component: TodosConfirmationForm;
  let fixture: ComponentFixture<TodosConfirmationForm>;
  let dialogRefSpyObj: { close: unknown };

  beforeEach(async () => {
    dialogRefSpyObj = jasmine.createSpyObj({ close: null });
    await TestBed.configureTestingModule({
      declarations: [TodosConfirmationForm],
      providers: [{ provide: MatDialogRef, useValue: dialogRefSpyObj }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosConfirmationForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog on confirm click', () => {
    component.onConfirmClick();
    expect(dialogRefSpyObj.close).toHaveBeenCalledWith(true);
  });
});
