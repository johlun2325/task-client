export interface Task {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  priority: boolean;
}

// for tasks without id and completed fields
export type NewTask = Omit<Task, 'id' | 'completed'>;

// for paritial updates
export type TaskUpdate = Partial<Task>;