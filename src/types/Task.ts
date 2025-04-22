export interface Task {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  priority: boolean;
}

export type NewTask = Omit<Task, 'id' | 'completed'>;
