import { Task } from '../types/Task';

export const mockTasks: Task[] = [
  {
    id: '64b1e2c7f9a1a8d0e3f0b1a1',
    name: 'Lorem ipsum dolor',
    description: 'Sit amet, consectetur adipiscing elit.',
    completed: false,
    priority: true  // High
  },
  {
    id: '64b1e2c7f9a1a8d0e3f0b1a2',
    name: 'Sed do eiusmod',
    description: 'Tempor incididunt ut labore et dolore magna aliqua.',
    completed: true, //completed
    priority: false
  },
  {
    id: '64b1e2c7f9a1a8d0e3f0b1a3',
    name: 'Ut enim ad minim',
    description: 'Veniam quis nostrud exercitation ullamco laboris.',
    completed: false,
    priority: true  // High
  },
  {
    id: '64b1e2c7f9a1a8d0e3f0b1a4',
    name: 'Duis aute irure',
    description: 'Dolor in reprehenderit in voluptate velit esse.',
    completed: false,
    priority: false
  },
  {
    id: '64b1e2c7f9a1a8d0e3f0b1a5',
    name: 'Excepteur sint occaecat',
    description: 'Cupidatat non proident, sunt in culpa qui officia.',
    completed: false,
    priority: false
  }
];
