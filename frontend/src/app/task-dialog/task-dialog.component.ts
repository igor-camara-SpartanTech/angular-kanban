import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

interface DialogData {
  columnName: string;
  taskId?: number;
}

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent {
  taskForm: FormGroup;
  dialogTitle: string;
  priorities = [
    { value: 'low', label: 'Baixa' },
    { value: 'medium', label: 'Média' },
    { value: 'high', label: 'Alta' }
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.dialogTitle = data.taskId ? 'Editar Tarefa' : 'Nova Tarefa';
    
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      assignee: [''],
      dueDate: [null],
      priority: ['medium', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.dialogRef.close({
        ...this.taskForm.value,
        id: this.data.taskId || Math.floor(Math.random() * 10000) // Gera ID aleatório para novas tarefas
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}