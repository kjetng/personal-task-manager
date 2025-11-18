import { TaskModal } from '@/components/TaskModal';
import { useUpdateTask } from '@/hooks/useUpdateTask';
import { FilterStatus, Task, TaskStatus } from '@/types';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';
import { TaskTable } from '../components/TaskTable';
import { useCreateTask } from '../hooks/useCreateTask';
import { useGetTasks } from '../hooks/useGetTasks';

export const YourTasksPage = () => {
  const [filter, setFilter] = useState<FilterStatus>('All');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { data: tasks = [] } = useGetTasks(filter);
  const createMutation = useCreateTask();
  const updateMutation = useUpdateTask();

  const handleOpenModal = (task?: Task) => {
    setEditingTask(task || null);
    setModalOpen(true);
  };

  const handleSubmit = (values: { name: string; dueDate?: string | null }) => {
    if (editingTask) {
      updateMutation.mutate({
        ...editingTask,
        name: values.name,
        dueDate: values.dueDate ?? null,
      });
    } else {
      createMutation.mutate({
        name: values.name,
        dueDate: values.dueDate ?? undefined,
      });
    }
    setModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-4xl font-bold text-blue-900">
            Màn hình quản lý task cá nhân
          </h1>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          {/* Filter */}
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            <div>
              Filter:
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as TaskStatus)}
                className="ml-2 cursor-pointer appearance-none rounded-xl border border-gray-300 bg-white px-4 py-1 text-base transition-all hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="All">All</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white shadow-2xl transition-all hover:bg-blue-600 hover:shadow-2xl"
            >
              <FaPlus className="h-4 w-4" />
            </button>
          </div>
          <TaskTable tasks={tasks} filter={filter} onEdit={handleOpenModal} />
        </div>

        {/* Floating Add Button */}

        <TaskModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditingTask(null);
          }}
          onSubmit={handleSubmit}
          task={editingTask}
        />
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
