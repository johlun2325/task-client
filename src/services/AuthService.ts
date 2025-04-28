// Base URL for API-call
const API_BASE_URL = 'http://localhost:8080';

export const authService = {
  // Check if user is logged in
  checkAuthStatus: async (): Promise<boolean> => {
    const token = localStorage.getItem('auth_token');
    console.log('Checking auth status, token exists:', !!token);
    
    if (!token) {
      return false;
    }
    
    try {
      // Validate token with backend
      const response = await fetch(`${API_BASE_URL}/api/auth/validate`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const isValid = response.ok;
      console.log('Token validation result:', isValid);
      return isValid;

    } catch (error) {
      console.error('Token validation failed:', error);
      localStorage.removeItem('auth_token');
      return false;
    }
  },

  // Login user
  login: async (): Promise<boolean> => {
    console.log('Attempting login to backend...');
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        console.error('Login failed with status:', response.status);
        throw new Error('Login failed');
      }
      
      // Get  token from response
      const token = await response.text();
      console.log('Login successful, received token:', token.substring(0, 10) + '...');
      
      // Save token in localStorage
      localStorage.setItem('auth_token', token);
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },

  // Logout user
  logout: async (): Promise<void> => {
    const token = localStorage.getItem('auth_token');
    console.log('Attempting logout, token exists:', !!token);
    
    if (token) {
      try {
        // Notify backend of logout
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Logout notification sent to backend');
      } catch (error) {
        console.error('Logout notification failed:', error);
      }
    }
    
    // Remove token from localStorage
    localStorage.removeItem('auth_token');
    console.log('Token removed from localStorage');
  },

  // Helper method to get auth_token
  getToken: (): string | null => {
    return localStorage.getItem('auth_token');
  }
};
