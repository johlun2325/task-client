import { useState } from 'react';

const TaskForm = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(false);

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();    
    setTaskName('');
    setDescription('');
    setPriority(false);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="taskName" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="taskName"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          required
          />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
        />
      </div>

      <div className="flex items-center">
        <div className="form-control">
          <label className="flex items-center cursor-pointer">
            <span className="mr-3 text-sm font-medium text-gray-700">High Priority</span>
            <div className="relative">
              <input 
                type="checkbox"
                checked={priority}
                onChange={(e) => setPriority(e.target.checked)}
                className="sr-only" 
              />
              <div className={`block w-10 h-6 rounded-full ${priority ? 'bg-red-500' : 'bg-gray-300'} transition-colors`}></div>
              <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${priority ? 'transform translate-x-4' : ''}`}></div>
            </div>
          </label>
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md">
        Save
      </button>
    </form>
  );
};

export default TaskForm;
