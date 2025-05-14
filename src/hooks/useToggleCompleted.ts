import { apiService } from "../services/ApiService";

export const useToggleCompleted = () => {
  const handleToggleCompleted = async (
    uid: string,
    currentCompleted: boolean,
    refetchAll: () => Promise<void>
  ) => {
    try {
      await apiService.task.update(uid, { completed: !currentCompleted });
      console.log(`Task ${uid} completion toggled to ${!currentCompleted}`);

      await refetchAll();
      console.log("All task lists have been refreshed");
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  return { handleToggleCompleted };
};
