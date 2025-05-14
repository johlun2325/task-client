import { useCompleted } from "../../hooks/useCompleted";
import { useToggleCompleted } from "../../hooks/useToggleCompleted";

const CompletedTasks = () => {
  const { tasks, loading, error, refetch } = useCompleted();
  const { handleToggleCompleted } = useToggleCompleted();

  if (loading) {
    return <p className="text-gray-500">Loading tasks...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (tasks.length === 0) {
    return (
      <p className="text-gray-500">
        No completed tasks yet. Mark a task as completed!
      </p>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      {tasks.map((task) => (
        <li key={`completed-${task.uid}`} className="py-4">
          <div className="flex items-start">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() =>
                handleToggleCompleted(task.uid, task.completed, refetch)
              }
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div className="ml-3 flex-grow">
              <div className="flex items-center justify-between">
                <p
                  className={`text-sm font-medium ${
                    task.completed ? "text-gray-400" : "text-gray-900"
                  }`}
                >
                  {task.title}
                </p>
              </div>
              <p className="mt-1 text-sm text-gray-500">{task.description}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CompletedTasks;
