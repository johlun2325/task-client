import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const LandingPage = () => {
  const { isAuthenticated, login, isLoading } = useAuth();

  // If logged in, to dashboard/home
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Chaos Manager</h1>
          <p className="mt-3 text-gray-600">
            Welcome to your chaotic playground!
          </p>
        </div>
        
        <div className="mt-8">
          <button
            onClick={login}
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Login to see and manage all your tasks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
