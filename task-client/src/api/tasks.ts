import type { CreateTaskPayload, Task, UpdateTaskPayload } from '../types';
import api from './base';

export const getTasks = async (
  statusFilter?: 'InProgress' | 'Completed',
): Promise<Task[]> => {
  const params = statusFilter ? { statusFilter } : {};
  const { data } = await api.get<Task[]>('/tasks', { params });
  return data;
};

export const createTask = async (payload: CreateTaskPayload): Promise<Task> => {
  const { data } = await api.post<Task>('/tasks', {
    ...payload,
    status: 'InProgress' as const,
  });
  return data;
};

export const updateTask = async (
  id: number,
  payload: UpdateTaskPayload,
): Promise<Task> => {
  const { data } = await api.put<Task>(`/tasks/${id}`, payload);
  return data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
