import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import type { Task } from '../types';

const TaskSchema = Yup.object().shape({
  name: Yup.string().required('Tên task là bắt buộc'),
  dueDate: Yup.date().nullable(),
});

interface TaskFormProps {
  initialValues: { name: string; dueDate: string; status?: Task['status'] };
  onSubmit: (values: {
    name: string;
    dueDate?: string;
    status?: Task['status'];
  }) => void;
  isSubmitting: boolean;
  editingId?: number | null;
  buttonText: string;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  initialValues,
  onSubmit,
  isSubmitting,
  editingId,
  buttonText,
}) => (
  <Formik
    initialValues={initialValues}
    validationSchema={TaskSchema}
    onSubmit={onSubmit}
    enableReinitialize={true}
  >
    {({ isSubmitting: formSubmitting, values }) => (
      <Form className="mb-8 rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Tên task
            </label>
            <Field
              id="name"
              name="name"
              type="text"
              className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:outline-none"
              placeholder="Nhập tên task"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="mt-1 text-sm text-red-500"
            />
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Ngày hết hạn
            </label>
            <Field
              id="dueDate"
              name="dueDate"
              type="date"
              className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:outline-none"
            />
          </div>

          {editingId && (
            <div>
              <label
                htmlFor="status"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Trạng thái
              </label>
              <Field
                as="select"
                id="status"
                name="status"
                className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:outline-none"
              >
                <option value="InProgress">Đang làm</option>
                <option value="Completed">Hoàn thành</option>
              </Field>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || formSubmitting}
          className="bg-primary w-full rounded-md px-6 py-2 text-white hover:bg-blue-600 disabled:opacity-50 md:w-auto"
        >
          {formSubmitting ? 'Đang xử lý...' : buttonText}
        </button>
      </Form>
    )}
  </Formik>
);
