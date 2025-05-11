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

// payload
export type NewTask = {
  title: string;
  description: string;
  priority: boolean;
  completed: boolean;
};

// for partial updates
export type TaskUpdate = Partial<NewTask>;