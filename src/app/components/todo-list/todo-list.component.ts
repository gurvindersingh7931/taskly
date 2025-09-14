import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil, combineLatest } from 'rxjs';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoService } from '../../services/todo.service';
import { Todo, TodoPriority, TodoFilter, TodoStatus, CreateTodoRequest } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  filter: TodoFilter = { status: TodoStatus.ALL };
  searchTerm = '';
  
  // New todo form
  newTodoTitle = '';
  newTodoDescription = '';
  newTodoPriority: TodoPriority = TodoPriority.MEDIUM;
  showNewTodoForm = false;
  
  // Stats
  stats = { total: 0, completed: 0, active: 0 };
  
  // Priority options for dropdown
  priorityOptions = [
    { value: TodoPriority.LOW, label: '🟢 Low', color: '#28a745' },
    { value: TodoPriority.MEDIUM, label: '🟡 Medium', color: '#ffc107' },
    { value: TodoPriority.HIGH, label: '🔴 High', color: '#dc3545' }
  ];

  // Make enums available in template
  TodoStatus = TodoStatus;
  TodoPriority = TodoPriority;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    // Subscribe to filtered todos and stats
    combineLatest([
      this.todoService.filteredTodos$,
      this.todoService.getStats(),
      this.todoService.todos$,
      this.todoService.filter$
    ])
    .pipe(takeUntil(this.destroy$))
    .subscribe(([filteredTodos, stats, todos, filter]) => {
      this.filteredTodos = filteredTodos;
      this.stats = stats;
      this.todos = todos;
      this.filter = filter;
      this.searchTerm = filter.searchTerm || '';
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Filter methods
  setStatusFilter(status: TodoStatus) {
    this.todoService.setFilter({ status });
  }

  setPriorityFilter(priority: TodoPriority | undefined) {
    this.todoService.setFilter({ priority });
  }

  onSearchChange() {
    this.todoService.setFilter({ 
      searchTerm: this.searchTerm.trim() || undefined 
    });
  }

  clearFilters() {
    this.searchTerm = '';
    this.todoService.setFilter({ 
      status: TodoStatus.ALL, 
      priority: undefined, 
      searchTerm: undefined 
    });
  }

  // Todo CRUD operations
  onToggleTodo(id: string) {
    this.todoService.toggleTodo(id);
  }

  onEditTodo(updatedTodo: Todo) {
    this.todoService.updateTodo(updatedTodo.id, {
      title: updatedTodo.title,
      description: updatedTodo.description,
      priority: updatedTodo.priority
    });
  }

  onDeleteTodo(id: string) {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoService.deleteTodo(id);
    }
  }

  // New todo methods
  showAddTodoForm() {
    this.showNewTodoForm = true;
  }

  hideAddTodoForm() {
    this.showNewTodoForm = false;
    this.resetNewTodoForm();
  }

  resetNewTodoForm() {
    this.newTodoTitle = '';
    this.newTodoDescription = '';
    this.newTodoPriority = TodoPriority.MEDIUM;
  }

  addTodo() {
    if (this.newTodoTitle.trim()) {
      const request: CreateTodoRequest = {
        title: this.newTodoTitle.trim(),
        description: this.newTodoDescription.trim() || undefined,
        priority: this.newTodoPriority
      };
      
      this.todoService.createTodo(request);
      this.hideAddTodoForm();
    }
  }

  // Bulk operations
  clearCompleted() {
    if (this.stats.completed > 0) {
      if (confirm(`Are you sure you want to delete ${this.stats.completed} completed todo(s)?`)) {
        this.todoService.clearCompleted();
      }
    }
  }

  markAllComplete() {
    this.todos.forEach(todo => {
      if (!todo.completed) {
        this.todoService.toggleTodo(todo.id);
      }
    });
  }

  // Helper methods
  getFilterButtonClass(status: TodoStatus): string {
    return this.filter.status === status ? 'active' : '';
  }

  getPriorityButtonClass(priority: TodoPriority | undefined): string {
    return this.filter.priority === priority ? 'active' : '';
  }

  hasActiveFilters(): boolean {
    return this.filter.status !== TodoStatus.ALL || 
           this.filter.priority !== undefined || 
           this.searchTerm.trim() !== '';
  }

  // Track by function for ngFor performance
  trackByTodoId(index: number, todo: Todo): string {
    return todo.id;
  }
}
