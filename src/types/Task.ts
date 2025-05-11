export interface Task {
  uid: string;
  title: string;
  description: string;
  completed: boolean;
  priority: boolean;
  createdAt: number;
  updatedAt: number;
  completedAt: number;
}

// for tasks without id and completed fields
export type NewTask = Omit<Task, 'uid'>;

// for paritial updates
export type TaskUpdate = Partial<Task>;