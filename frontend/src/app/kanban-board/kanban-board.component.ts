import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

interface Task {
  id: number;
  title: string;
  description: string;
  assignee?: string;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
}

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, MatDialogModule, MatButtonModule],
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit {
  todo: Task[] = [];
  inProgress: Task[] = [];
  testing: Task[] = [];
  done: Task[] = [];

  constructor(private dialog: MatDialog) { }

  openTaskDialog(columnName: string, taskId?: number) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: { columnName, taskId }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addTask(columnName, result);
      }
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  addTask(columnName: string, task: Task) {
    switch (columnName) {
      case 'todo':
        this.todo.push(task);
        break;
      case 'inProgress':
        this.inProgress.push(task);
        break;
      case 'testing':
        this.testing.push(task);
        break;
      case 'done':
        this.done.push(task);
        break;
    }
  }

  removeTask(columnName: string, taskId: number) {
    let column: Task[] = [];
    
    switch (columnName) {
      case 'todo':
        column = this.todo;
        break;
      case 'inProgress':
        column = this.inProgress;
        break;
      case 'testing':
        column = this.testing;
        break;
      case 'done':
        column = this.done;
        break;
    }
    
    const index = column.findIndex(task => task.id === taskId);
    if (index !== -1) {
      column.splice(index, 1);
    }
  }

  private loadTasks() {
    this.todo = [
      { id: 1, title: 'Criar componentes básicos', description: 'Desenvolver os componentes iniciais do projeto', priority: 'high' },
      { id: 2, title: 'Configurar rotas', description: 'Definir as rotas da aplicação', priority: 'medium' }
    ];
    
    this.inProgress = [
      { id: 3, title: 'Implementar serviço de autenticação', description: 'Criar serviço para login e registro', priority: 'high' }
    ];
    
    this.testing = [
      { id: 4, title: 'Testar componente de listagem', description: 'Verificar se a listagem está funcionando corretamente', priority: 'medium' }
    ];
    
    this.done = [
      { id: 5, title: 'Configurar ambiente', description: 'Preparar ambiente de desenvolvimento', priority: 'low' }
    ];
  }
}