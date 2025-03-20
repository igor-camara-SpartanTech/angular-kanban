import { Component } from '@angular/core';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, KanbanBoardComponent],
  template: `
    <div class="app-container">
      <app-kanban-board></app-kanban-board>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'kanban-app';
}