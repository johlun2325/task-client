import { authService } from './AuthService';

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
      'Authorization': `Bearer ${token}`
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
  
  // Test endpoint to fetch tasks
  getTasks: async () => {
    const response = await apiService.fetchAuthenticated('/api/tasks');
    
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    
    return response.json();
  }
};
