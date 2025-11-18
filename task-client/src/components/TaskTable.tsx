import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDeleteTask } from '../hooks/useDeleteTask';
import { useToggleStatus } from '../hooks/useToggleStatus';
import type { Task, TaskStatus } from '../types';
import { formatDate, getStatusLabel } from '../utils';
import { DeleteConfirmModal } from './DeleteConfirmModal';

interface TaskTableProps {
  tasks: Task[];
  filter: TaskStatus | 'All';
  onEdit: (task: Task) => void;
}

export const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  filter,
  onEdit,
}) => {
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    taskId: number;
    taskName: string;
  } | null>(null);
  const toggleMutation = useToggleStatus({
    onError: (errorMessage) => {
      toast.error(errorMessage);
    },
    onSuccess: (task) => {
      if (task.status === 'Completed') {
        toast.success('Congrats! 1 task ticked off');
      }
    },
  });
  const deleteMutation = useDeleteTask({
    onError: (errorMessage) => {
      toast.error(errorMessage);
    },
    onSuccess: () => {
      toast.success('Task deleted successfully.');
    },
  });

  const filtered = tasks.filter((t) => filter === 'All' || t.status === filter);

  return (
    <table className="w-full">
      <thead className="bg-blue-500 text-white">
        <tr>
          <th className="px-6 py-4 text-left text-sm font-medium">Task</th>
          <th className="px-6 py-4 text-left text-sm font-medium">Due-date</th>
          <th className="px-6 py-4 text-left text-sm font-medium">Status</th>
          <th className="px-6 py-4 text-left text-sm font-medium"></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {filtered.length === 0 ? (
          <tr>
            <td colSpan={4} className="py-12 text-center text-gray-500">
              No tasks found.
            </td>
          </tr>
        ) : (
          filtered.map((task) => (
            <tr key={task.id} className="transition-colors hover:bg-gray-50">
              <td className="flex items-center space-x-3 px-6 py-4">
                <input
                  type="checkbox"
                  checked={task.status === 'Completed'}
                  onChange={() => toggleMutation.mutate(task)}
                  className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="font-medium text-gray-900">{task.name}</span>
              </td>
              <td className="px-6 py-4 text-gray-600">
                {formatDate(task.dueDate)}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                    task.status === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {getStatusLabel(task.status)}
                </span>
              </td>
              <td className="space-x-3 px-6 py-4 text-right">
                <button
                  onClick={() => onEdit(task)}
                  className="text-gray-500 transition-colors hover:cursor-pointer hover:text-blue-600"
                >
                  <FaEdit className="h-4 w-4" />
                </button>
                <button
                  onClick={() =>
                    setDeleteModal({
                      open: true,
                      taskId: task.id,
                      taskName: task.name,
                    })
                  }
                  className="text-gray-500 transition-colors hover:cursor-pointer hover:text-red-600"
                >
                  <FaTrash className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
      <DeleteConfirmModal
        isOpen={!!deleteModal?.open}
        taskName={deleteModal?.taskName || ''}
        onClose={() => setDeleteModal(null)}
        onConfirm={() => {
          deleteMutation.mutate(deleteModal!.taskId);
          setDeleteModal(null);
        }}
        isDeleting={deleteMutation.isPending}
      />
    </table>
  );
};
