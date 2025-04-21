import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      <header className="bg-white shadow-sm">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-900">Chaos Manager</h1>
          </div>
        </div>

      </header>
 
      {/* Main content */}
      <div className="flex flex-1">

      <aside className="w-46 bg-white shadow-md">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link to="/" className="block p-2 rounded hover:bg-gray-100">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" className="block p-2 rounded hover:bg-gray-100">
                  Tasks
                </Link>
              </li>
              <li>
                <Link to="/" className="block p-2 rounded hover:bg-gray-100">
                  Lists
                </Link>
              </li>
              <li>
                <Link to="/" className="block p-2 rounded hover:bg-gray-100">
                  Notes
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
  
        <main className="flex-1 p-6">
          {children}
        </main>

      </div>
    </div>
  );
};

export default MainLayout;
