import { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { apiService } from '../../services/ApiService';
import { Task } from '../../types/Task';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => Promise<void>;
  existingTask?: Task | null;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isOpen, onClose, onCreated, existingTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(false);

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description);
      setPriority(existingTask.priority);
    } else {
      setTitle('');
      setDescription('');
      setPriority(false);
    }
  }, [existingTask]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (existingTask) {
        await apiService.task.update(existingTask.uid, {
          title,
          description,
          priority,
          completed: existingTask.completed,
        });
      } else {
        await apiService.task.create({
          title,
          description,
          priority,
          completed: false,
        });
      }

      await onCreated();
      onClose();
    } catch (err) {
      console.error('Failed to save task:', err);
    }
  };

  const handleDelete = async () => {
    if (existingTask) {
      try {
        await apiService.task.delete(existingTask.uid);
        await onCreated();
        onClose();
      } catch (err) {
        console.error('Failed to delete task:', err);
      }
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white p-6 rounded shadow-lg w-full max-w-md">
          <DialogTitle className="text-lg font-semibold mb-4">
            {existingTask ? 'Edit Task' : 'Create Task'}
          </DialogTitle>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              className="w-full border px-3 py-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Description"
              className="w-full border px-3 py-2 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={priority}
                onChange={(e) => setPriority(e.target.checked)}
              />
              High Priority
            </label>
            <div className="flex justify-between gap-2 mt-4">
              {existingTask && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              )}
              <div className="flex gap-2 ml-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-500 hover:underline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {existingTask ? 'Update' : 'Save'}
                </button>
              </div>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CreateTaskModal;
