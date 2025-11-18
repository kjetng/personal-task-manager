import type { Task } from '../types';

export const getStatusLabel = (status: Task['status']): string =>
  status === 'InProgress' ? 'In Progress' : 'Completed';

export const formatDate = (dateString?: string | null): string =>
  dateString ? new Date(dateString).toLocaleDateString('vi-VN') : '-';
