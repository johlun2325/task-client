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
        <DialogPanel className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl mx-auto">
          <DialogTitle className="text-2xl font-semibold mb-6">
            {existingTask ? 'Edit Task' : 'Create Task'}
          </DialogTitle>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                id="taskTitle"
                type="text"
                placeholder="Task title"
                className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="taskDescription"
                placeholder="Enter task details..."
                className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={8}
                style={{ minHeight: "200px", resize: "vertical" }}
              />
            </div>
            
            <div className="flex items-center gap-3 pt-2">
              <label className="flex items-center gap-3 text-base cursor-pointer">
                <input
                  type="checkbox"
                  checked={priority}
                  onChange={(e) => setPriority(e.target.checked)}
                  className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="font-medium">High Priority</span>
              </label>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-4">
              {existingTask && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="text-red-600 hover:text-red-800 font-medium hover:underline"
                >
                  Delete Task
                </button>
              )}
              <div className="flex gap-3 ml-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  {existingTask ? 'Update Task' : 'Save Task'}
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
