import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface MainLayoutProps {
  children: ReactNode;
}
const MainLayout = ({ children }: MainLayoutProps) => {
  const { logout } = useAuth();

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      
      <header className="bg-white shadow-sm h-16 flex items-center z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-xl font-bold text-gray-900">Chaos Manager</h1>
          <button 
            onClick={logout}
            className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Log out
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        <aside className="w-46 bg-white shadow-md p-4 overflow-y-auto">
          <nav>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="block p-2 rounded hover:bg-gray-100">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tasks" className="block p-2 rounded hover:bg-gray-100">
                  Tasks
                </Link>
              </li>
              <li>
                <Link to="/notes" className="block p-2 rounded hover:bg-gray-100">
                  Notes
                </Link>
              </li>
              <li>
                <Link to="/completed" className="block p-2 rounded hover:bg-gray-100">
                  Done
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
