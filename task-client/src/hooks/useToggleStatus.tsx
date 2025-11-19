import { Task } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '../api/tasks';

export const useToggleStatus = (options: {
  onSuccess?: (data: Task) => void;
  onError?: (errorMessage: string) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Task) => {
      task.status = task.status === 'Completed' ? 'InProgress' : 'Completed';
      return updateTask(task.id, {
        name: task.name,
        dueDate: task.dueDate ?? undefined,
        status: task.status,
      });
    },
    onError: () => {
      options.onError?.('Failed to toggle task status.');
    },
    onSuccess: (toggledTask) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      options.onSuccess?.(toggledTask);
    },
  });
};
