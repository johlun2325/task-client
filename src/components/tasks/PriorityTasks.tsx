import { useState, useEffect } from "react";
import { usePriority } from "../../hooks/usePriority";
import CreateTaskModal from "../tasks/CreateTaskModal";
import { Task } from "../../types/Task";
import { useToggleCompleted } from "../../hooks/useToggleCompleted";
import { useRefetch } from "../../hooks/useRefetch";

const PriorityTaskList = () => {
  const { tasks, loading, error, refetch } = usePriority();
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

  if (loading)
    return <p className="text-gray-500">Loading priority tasks...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <ul className="divide-y divide-gray-200">
        {tasks
          .filter((task) => !task.completed)
          .slice()
          .sort((a, b) => b.updatedAt - a.updatedAt)
          .map((task) => (
            <li key={`priority-${task.uid}`} className="py-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() =>
                    handleToggleCompleted(task.uid, task.completed, refetchAll)
                  }
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
                    <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      High Priority
                    </span>
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

export default PriorityTaskList;
