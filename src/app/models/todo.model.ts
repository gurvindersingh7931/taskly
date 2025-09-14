export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: TodoPriority;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

export enum TodoPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export interface TodoFilter {
  status: TodoStatus;
  priority?: TodoPriority;
  searchTerm?: string;
}

export enum TodoStatus {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed'
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
  priority: TodoPriority;
  dueDate?: Date;
  tags?: string[];
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: TodoPriority;
  dueDate?: Date;
  tags?: string[];
}
