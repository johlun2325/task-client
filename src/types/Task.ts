export interface Task {
  id: string;
  name: string;
  description: string;
  completed: boolean;
}

export type NewTask = Omit<Task, 'id' | 'completed'>;
