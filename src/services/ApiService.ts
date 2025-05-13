import { authService } from '../auth/services/AuthService';
import { Note, NewNote, NoteUpdate } from '../types/Note';
import { Task, NewTask, TaskUpdate} from '../types/Task'
import { ApiResponse } from '../types/ApiResponse';
import { FeedbackEvent } from '../types/Feedback';

const API_BASE_URL = 'http://localhost:8080';

export const apiService = {
  // Generic method for api calls with authentication
  fetchAuthenticated: async (endpoint: string, options: RequestInit = {}) => {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error('No authentication token available');
    }
    
    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });
    
    // Handle 401, invalid token
    if (response.status === 401) {
      // Remove token and route to landing page for login
      authService.logout();
      window.location.href = '/';
      throw new Error('Authentication expired');
    }
    
    return response;
  },
  
  // Notes endpoints
  note: {
    getAll: async (): Promise<Note[]> => {
      const response = await apiService.fetchAuthenticated('/note/all');
      
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
  
      const result: ApiResponse<Note[]> = await response.json();
      return result.data;
    },
    
    create: async (task: NewNote): Promise<Note> => {
      const response = await apiService.fetchAuthenticated('/note/create', {
        method: 'POST',
        body: JSON.stringify(task)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
      
      return response.json();
    },
    
    update: async (uid: string, note: NoteUpdate): Promise<Note> => {
      const response = await apiService.fetchAuthenticated(`/note/update/${uid}`, {
        method: 'PUT',
        body: JSON.stringify(note)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update note');
      }
      
      return response.json();
    },
    
    delete: async (uid: string): Promise<void> => {
      const response = await apiService.fetchAuthenticated(`/note/delete/${uid}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete note');
      }
    }
  },
  
  // Tasks endpoints
  task: {
    getAll: async (): Promise<Task[]> => {
      const response = await apiService.fetchAuthenticated('/task/all');
  
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
  
      const result: ApiResponse<Task[]> = await response.json();
      return result.data;
    },
  
    getPriority: async (): Promise<Task[]> => {
      const response = await apiService.fetchAuthenticated('/task/priority');
  
      if (!response.ok) {
        throw new Error('Failed to fetch priority tasks');
      }
  
      const result: ApiResponse<Task[]> = await response.json();
      return result.data;
    },
  
    getCompleted: async (): Promise<Task[]> => {
      const response = await apiService.fetchAuthenticated('/task/completed');
  
      if (!response.ok) {
        throw new Error('Failed to fetch completed tasks');
      }
  
      const result: ApiResponse<Task[]> = await response.json();
      return result.data;
    },
    
    create: async (task: NewTask): Promise<Task> => {
      const response = await apiService.fetchAuthenticated('/task/create', {
        method: 'POST',
        body: JSON.stringify(task)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
      
      return response.json();
    },
    
    update: async (uid: string, task: TaskUpdate): Promise<Task> => {
      const response = await apiService.fetchAuthenticated(`/task/update/${uid}`, {
        method: 'PUT',
        body: JSON.stringify(task)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      
      return response.json();
    },
    
    delete: async (uid: string): Promise<void> => {
      const response = await apiService.fetchAuthenticated(`/task/delete/${uid}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
    }
  },

  feedback: {
    get: async (): Promise<FeedbackEvent[]> => {
      const response = await apiService.fetchAuthenticated('/feedback');

      if (response.status === 204) {
        return [];
      }

      if (!response.ok) {
        throw new Error('Failed to fetch feedback');
      }

      return response.json();
    }
  }
};
