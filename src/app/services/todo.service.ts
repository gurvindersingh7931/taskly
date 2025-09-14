import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, combineLatest } from 'rxjs';
import { Todo, TodoPriority, TodoFilter, TodoStatus, CreateTodoRequest, UpdateTodoRequest } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly STORAGE_KEY = 'todos';
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  private filterSubject = new BehaviorSubject<TodoFilter>({ status: TodoStatus.ALL });
  
  public todos$ = this.todosSubject.asObservable();
  public filter$ = this.filterSubject.asObservable();
  public filteredTodos$ = combineLatest([
    this.todos$,
    this.filter$
  ]).pipe(
    map(([todos, filter]) => this.applyFilter(todos, filter))
  );

  constructor() {
    this.loadTodos();
  }

  private loadTodos(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const todos = JSON.parse(stored).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt),
          dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined
        }));
        this.todosSubject.next(todos);
      } catch (error) {
        console.error('Error loading todos from localStorage:', error);
        this.todosSubject.next([]);
      }
    }
  }

  private saveTodos(todos: Todo[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
    this.todosSubject.next(todos);
  }

  private applyFilter(todos: Todo[], filter: TodoFilter): Todo[] {
    let filtered = todos;

    // Filter by status
    switch (filter.status) {
      case TodoStatus.ACTIVE:
        filtered = filtered.filter(todo => !todo.completed);
        break;
      case TodoStatus.COMPLETED:
        filtered = filtered.filter(todo => todo.completed);
        break;
    }

    // Filter by priority
    if (filter.priority) {
      filtered = filtered.filter(todo => todo.priority === filter.priority);
    }

    // Filter by search term
    if (filter.searchTerm) {
      const searchLower = filter.searchTerm.toLowerCase();
      filtered = filtered.filter(todo => 
        todo.title.toLowerCase().includes(searchLower) ||
        (todo.description && todo.description.toLowerCase().includes(searchLower)) ||
        (todo.tags && todo.tags.some(tag => tag.toLowerCase().includes(searchLower)))
      );
    }

    return filtered.sort((a, b) => {
      // Sort by priority (high first), then by creation date (newest first)
      const priorityOrder = { [TodoPriority.HIGH]: 3, [TodoPriority.MEDIUM]: 2, [TodoPriority.LOW]: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Public methods
  createTodo(request: CreateTodoRequest): Todo {
    const newTodo: Todo = {
      id: this.generateId(),
      title: request.title,
      description: request.description,
      completed: false,
      priority: request.priority,
      dueDate: request.dueDate,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: request.tags || []
    };

    const todos = [...this.todosSubject.value, newTodo];
    this.saveTodos(todos);
    return newTodo;
  }

  updateTodo(id: string, request: UpdateTodoRequest): Todo | null {
    const todos = this.todosSubject.value;
    const index = todos.findIndex(todo => todo.id === id);
    
    if (index === -1) return null;

    const updatedTodo = {
      ...todos[index],
      ...request,
      updatedAt: new Date()
    };

    todos[index] = updatedTodo;
    this.saveTodos(todos);
    return updatedTodo;
  }

  deleteTodo(id: string): boolean {
    const todos = this.todosSubject.value.filter(todo => todo.id !== id);
    this.saveTodos(todos);
    return todos.length !== this.todosSubject.value.length;
  }

  toggleTodo(id: string): Todo | null {
    const todo = this.todosSubject.value.find(t => t.id === id);
    if (!todo) return null;
    
    return this.updateTodo(id, { completed: !todo.completed });
  }

  setFilter(filter: Partial<TodoFilter>): void {
    const currentFilter = this.filterSubject.value;
    this.filterSubject.next({ ...currentFilter, ...filter });
  }

  clearCompleted(): void {
    const activeTodos = this.todosSubject.value.filter(todo => !todo.completed);
    this.saveTodos(activeTodos);
  }

  getStats(): Observable<{ total: number; completed: number; active: number }> {
    return this.todos$.pipe(
      map(todos => ({
        total: todos.length,
        completed: todos.filter(t => t.completed).length,
        active: todos.filter(t => !t.completed).length
      }))
    );
  }
}
