import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '../api/tasks';

export interface CreateTaskOptions {
  name: string;
  dueDate?: string | null;
}

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (options: CreateTaskOptions) =>
      createTask({
        name: options.name,
        dueDate: options.dueDate ?? undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
