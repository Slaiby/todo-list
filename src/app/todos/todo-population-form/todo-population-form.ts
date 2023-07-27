import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todos } from 'src/app/shared/interfaces/todos-models';

@Component({
  selector: 'app-todo-population-form',
  templateUrl: './todo-population-form.html',
  styleUrls: ['./todo-population-form.sass'],
})
export class AddTodoModalComponent implements OnInit {
  newTodo: Todos = {
    name: '',
    description: '',
    isComplete: false,
  };

  constructor(
    private dialogRef: MatDialogRef<AddTodoModalComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { todo: Todos; isEditing: boolean }
  ) {}

  ngOnInit(): void {
    this.newTodo = this.data.isEditing
      ? { ...this.data.todo }
      : { ...this.newTodo };
  }

  onSaveTodo(): void {
    const hasName = this.newTodo.name !== '';
    !hasName &&
      this.snackBar.open('Todo not saved, name is not defined', '', {
        duration: 2000,
      });
    this.dialogRef.close(hasName && this.newTodo);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
