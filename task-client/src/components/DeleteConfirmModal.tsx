// src/components/DeleteConfirmModal.tsx
import { FaTimes, FaTrash } from 'react-icons/fa';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  taskName: string;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  taskName,
  onClose,
  onConfirm,
  isDeleting = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 px-4 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Xóa task?</h3>
          <button
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-gray-600"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <p className="mb-6 text-gray-700">
          Are you sure you want to delete{' '}
          <span className="font-medium">"{taskName}"</span>? This action cannot
          be undone.
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-300"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex items-center space-x-2 rounded-lg bg-red-600 px-5 py-2 text-white transition-colors hover:bg-red-700 disabled:opacity-70"
          >
            <FaTrash className="h-4 w-4" />
            <span>{isDeleting ? 'Đang xóa...' : 'Xóa'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
