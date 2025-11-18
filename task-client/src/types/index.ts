export type TaskStatus = 'InProgress' | 'Completed';

export interface Task {
  id: number;
  name: string;
  dueDate: string | null;
  status: TaskStatus;
}

export interface CreateTaskPayload {
  name: string;
  dueDate?: string;
}

export interface UpdateTaskPayload {
  name: string;
  dueDate?: string;
  status: 'InProgress' | 'Completed';
}

export type FilterStatus = 'All' | TaskStatus;
