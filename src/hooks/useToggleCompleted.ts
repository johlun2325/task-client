import { apiService } from "../services/ApiService";
import { useTasks } from "./useTasks";
import { useCompleted } from "./useCompleted";
import { usePriority } from "./usePriority";

export const useToggleCompleted = () => {
  const { refetch: refetchAllTasks } = useTasks();
  const { refetch: refetchCompletedTasks } = useCompleted();
  const { refetch: refetchPriorityTasks } = usePriority();

  const handleToggleCompleted = async (
    uid: string,
    currentCompleted: boolean,
    componentRefetch?: () => Promise<void>
  ) => {
    try {
      await apiService.task.update(uid, { completed: !currentCompleted });
      console.log(`Task ${uid} completion toggled to ${!currentCompleted}`);
      
      if (componentRefetch) {
        await componentRefetch();
      }

      await Promise.all([
        refetchAllTasks(),
        refetchCompletedTasks(),
        refetchPriorityTasks()
      ]);

      console.log("All task lists have been refreshed");
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  return { handleToggleCompleted };
};
