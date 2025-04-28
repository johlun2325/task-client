import { useState, useEffect } from 'react';
import { authService } from '../services/AuthService';
import { AuthState } from '../types/Auth';

export const useAuthState = (): AuthState & {
  login: () => Promise<void>;
  logout: () => Promise<void>;
} => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    const checkAuthStatus = async () => {
      const isAuthenticated = await authService.checkAuthStatus();
      setState(prev => ({ ...prev, isAuthenticated, isLoading: false }));
    };
    
    checkAuthStatus();
  }, []);

  const login = async (): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const success = await authService.login();
      setState(prev => ({ ...prev, isAuthenticated: success, isLoading: false }));
    } catch (error) {
      console.error('Login failed:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const logout = async (): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      await authService.logout();
      setState(prev => ({ ...prev, isAuthenticated: false, isLoading: false }));
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
