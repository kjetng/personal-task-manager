import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FaTimes } from 'react-icons/fa';
import * as Yup from 'yup';
import type { Task } from '../types';

const schema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên task'),
});

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: { name: string; dueDate?: string | null }) => void;
  task?: Task | null;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  task,
}) => {
  if (!isOpen) return null;

  const isEdit = !!task;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEdit ? 'Edit task' : 'Add new task'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        <Formik
          initialValues={{
            name: task?.name || '',
            dueDate: task?.dueDate ? task.dueDate.split('T')[0] : undefined,
          }}
          validationSchema={schema}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values);
            resetForm();
            onClose();
          }}
          enableReinitialize={true}
        >
          <Form className="space-y-5">
            <div>
              <Field
                name="name"
                placeholder="Task"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            <div>
              <Field
                name="dueDate"
                type="date"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-700 hover:bg-gray-300"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-500 px-8 py-3 font-medium text-white hover:bg-blue-600"
              >
                {isEdit ? 'Update' : 'Add'}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
