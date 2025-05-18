import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/hooks/useAuth';

const LandingPage = () => {
  const { isAuthenticated, login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlError = urlParams.get('error');
    
    if (urlError) {
      setAuthError(urlError);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Chaos Manager</h1>
          <p className="mt-3 text-gray-600">
            Welcome!
          </p>
        </div>
        
        {(error || authError) && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
            <p className="text-red-700">{error || authError}</p>
          </div>
        )}
        
        <div className="mt-8">
          <button
            onClick={login}
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isLoading ? 'One moment...' : 'Login with Google'}
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Login to use the Chaos Manager.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
