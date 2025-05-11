import { useTasks } from '../../hooks/useTasks';

const TaskList = () => {
  const { tasks, loading, error } = useTasks();

  if (loading) {
    return <p className="text-gray-500">Loading tasks...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (tasks.length === 0) {
    return <p className="text-gray-500">No tasks yet. Create one!</p>;
  }

  return (
    <ul className="divide-y divide-gray-200">
      <div className="mt-4">
        <button className="w-full flex items-center justify-center py-3 px-4 border border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600 hover:border-blue-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Create New Task
        </button>
      </div>

      {tasks.map((task) => (
        <li key={task.uid} className="py-4">
          <div className="flex items-start">
            <input
              type="checkbox"
              checked={task.completed}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              readOnly
            />
            <div className="ml-3 flex-grow">
              <div className="flex items-center justify-between">
                <p className={`text-sm font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                  {task.name}
                </p>
                {task.priority && (
                  <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    High Priority
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">{task.description}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
