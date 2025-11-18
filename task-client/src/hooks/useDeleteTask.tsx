import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '../api/tasks';

export const useDeleteTask = (options: {
  onSuccess?: () => void;
  onError?: (errorMessage: string) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      options.onSuccess?.();
    },
    onError: () => {
      options.onError?.('Failed to delete task.');
    },
  });
};
