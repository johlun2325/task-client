import { useState, useEffect } from 'react';
import { apiService } from '../services/ApiService'
import { Task } from '../types/Task';

export const useCompleted = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response: Task[] = await apiService.task.getCompleted();
        console.log('API response:', response);
        setTasks(response);
        setLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch priority tasks';
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return { tasks, loading, error };
};
