import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { authService } from './services/AuthService';

export const AuthCallback = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const [hasProcessedRedirect, setHasProcessedRedirect] = useState(false);

  useEffect(() => {
    authService.handleRedirect();
    setHasProcessedRedirect(true);
  }, []);

  useEffect(() => {
    if (hasProcessedRedirect && !isLoading) {
      if (isAuthenticated) {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [hasProcessedRedirect, isAuthenticated, isLoading, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p className="ml-3">Completing authentication...</p>
    </div>
  );
};
