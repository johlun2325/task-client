import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/ApiService';
import { Task } from '../types/Task';

export const useCompleted = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const response: Task[] = await apiService.task.getCompleted();
      console.log('API response:', response);
      setTasks(response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch completed tasks';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, loading, error, refetch: fetchTasks };
};
