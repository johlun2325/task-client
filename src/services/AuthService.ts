//Todo: implement call to client-task-service

export const authService = {
    // Check if user is logged in
    checkAuthStatus: async (): Promise<boolean> => {
      // Todo: verify token, initially sent from backend
      const token = localStorage.getItem('auth_token');
      return !!token;
    },
  
    // Login
    login: async (): Promise<boolean> => {
      // Simulate a call to backend
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simulate success
          localStorage.setItem('auth_token', 'dummy_token');
          resolve(true);
        }, 1000); // Simulate time pass
      });
    },
  
    // Logout
    logout: (): void => {
      localStorage.removeItem('auth_token');
    }
  };
