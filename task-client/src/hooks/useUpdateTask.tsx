import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '../api/tasks';
import type { Task } from '../types';

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Task) =>
      updateTask(task.id, {
        name: task.name,
        dueDate: task.dueDate ?? undefined,
        status: task.status,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
