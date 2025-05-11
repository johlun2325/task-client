import { useState, useEffect } from 'react';
import { authService } from '../services/AuthService';
import { AuthState } from '../types/Auth';

export const useAuthState = () => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const isAuthenticated = await authService.checkAuthStatus();
        setState(prev => ({ 
          ...prev, 
          isAuthenticated, 
          isLoading: false,
          error: null
        }));
    } catch (error) {
        console.error('Auth error:', error); 
        setState(prev => ({ 
          ...prev, 
          isAuthenticated: false, 
          isLoading: false,
          error: 'Failed to verify authentication status'
        }));
      }
    };
    
    checkAuthStatus();
  }, []);

  const login = async (): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      await authService.login();
    } catch (error) {
      console.error('Login failed:', error);
      setState(prev => ({ 
        ...prev, 
        isLoading: false,
        error: 'Failed to initiate login'
      }));
    }
  };

  const logout = async (): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      await authService.logout();
      setState(prev => ({ 
        ...prev, 
        isAuthenticated: false, 
        isLoading: false 
      }));
    } catch (error) {
      console.error('Logout failed:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return {
    ...state,
    login,
    logout
  };
};
