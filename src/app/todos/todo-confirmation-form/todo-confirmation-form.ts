import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-confirmation-form',
  templateUrl: 'todo-confirmation-form.html',
  styleUrls: ['todo-confirmation-form.sass'],
})
export class TodosConfirmationForm {
  constructor(private dialogRef: MatDialogRef<TodosConfirmationForm>) {}

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
