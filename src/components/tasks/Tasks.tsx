import { useState, useEffect } from "react";
import { useTasks } from "../../hooks/useTasks";
import CreateTaskModal from "../tasks/CreateTaskModal";
import { Task } from "../../types/Task";
import { useToggleCompleted } from "../../hooks/useToggleCompleted";
import { useRefetch } from "../../hooks/useRefetch";

const TaskList = () => {
  const { tasks, loading, error, refetch } = useTasks();
  const { handleToggleCompleted } = useToggleCompleted();
  const { trigger, refetchAll } = useRefetch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    refetch();
  }, [trigger, refetch]);

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCheckboxChange = (task: Task) => {
    handleToggleCompleted(task.uid, task.completed, refetchAll);
  };

  if (loading) return <p className="text-gray-500">Loading tasks...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <ul className="divide-y divide-gray-200">
        <div className="mt-4">
          <button
            className="w-full flex items-center justify-center py-3 px-4 border border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600 hover:border-blue-300 transition-colors"
            onClick={() => {
              setSelectedTask(null);
              setIsModalOpen(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Create New Task
          </button>
        </div>

        {tasks
          .filter((task) => !task.completed)
          .slice()
          .sort((a, b) => b.updatedAt - a.updatedAt)
          .map((task) => (
            <li key={`all-${task.uid}`} className="py-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleCheckboxChange(task)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="ml-3 flex-grow">
                  <div className="flex items-center justify-between">
                    <p
                      onClick={() => handleEditTask(task)}
                      className={`text-sm font-medium cursor-pointer hover:underline 
                        ${
                          task.completed
                            ? "line-through text-gray-400"
                            : "text-gray-900"
                        }`}
                    >
                      {task.title}
                    </p>
                    {task.priority && (
                      <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        High Priority
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {task.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
      </ul>

      {isModalOpen && (
        <CreateTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreated={refetchAll}
          existingTask={selectedTask}
        />
      )}
    </>
  );
};

export default TaskList;
