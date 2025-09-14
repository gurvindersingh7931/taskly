import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo, TodoPriority } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() toggle = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<string>();

  isEditing = false;
  editTitle = '';
  editDescription = '';
  editPriority: TodoPriority = TodoPriority.MEDIUM;
  
  // Make TodoPriority enum available in template
  TodoPriority = TodoPriority;

  ngOnInit() {
    this.editTitle = this.todo.title;
    this.editDescription = this.todo.description || '';
    this.editPriority = this.todo.priority;
  }

  onToggle() {
    this.toggle.emit(this.todo.id);
  }

  onEdit() {
    this.isEditing = true;
  }

  onSave() {
    if (this.editTitle.trim()) {
      const updatedTodo = {
        ...this.todo,
        title: this.editTitle.trim(),
        description: this.editDescription.trim(),
        priority: this.editPriority,
        updatedAt: new Date()
      };
      this.edit.emit(updatedTodo);
      this.isEditing = false;
    }
  }

  onCancel() {
    this.isEditing = false;
    this.editTitle = this.todo.title;
    this.editDescription = this.todo.description || '';
    this.editPriority = this.todo.priority;
  }

  onDelete() {
    this.delete.emit(this.todo.id);
  }

  getPriorityClass(): string {
    return `priority-${this.todo.priority}`;
  }

  getPriorityIcon(): string {
    switch (this.todo.priority) {
      case TodoPriority.HIGH:
        return '🔴';
      case TodoPriority.MEDIUM:
        return '🟡';
      case TodoPriority.LOW:
        return '🟢';
      default:
        return '⚪';
    }
  }

  getPriorityLabel(): string {
    return this.todo.priority.charAt(0).toUpperCase() + this.todo.priority.slice(1);
  }

  isOverdue(): boolean {
    if (!this.todo.dueDate || this.todo.completed) return false;
    return new Date() > this.todo.dueDate;
  }

  getDaysUntilDue(): number {
    if (!this.todo.dueDate) return 0;
    const today = new Date();
    const dueDate = new Date(this.todo.dueDate);
    const diffTime = dueDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
