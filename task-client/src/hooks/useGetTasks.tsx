import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../api/tasks';
import type { FilterStatus, Task } from '../types';

export const useGetTasks = (filter: FilterStatus) => {
  const statusFilter = filter === 'All' ? undefined : filter;

  return useQuery<Task[]>({
    queryKey: ['tasks', filter],
    queryFn: () => getTasks(statusFilter),
  });
};
