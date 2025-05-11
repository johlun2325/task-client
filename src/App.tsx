import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProviders';
import { AuthCallback } from './auth/AuthCallback';
import { authService } from './auth/services/AuthService';
import ProtectedRoute from './auth/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/Home';
import AllTasks from './pages/AllTasks';
import AllNotes from './pages/AllNotes';
import CompletedTasks from './pages/CompletedTasks';

function App() {
  useEffect(() => {
    authService.handleRedirect();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public landing page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Auth callback route */}
          <Route path="/auth/callback" element={<AuthCallback />} />
          
          {/* Protected routes, needs logging in */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <MainLayout>
                <HomePage />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/tasks" element={
            <ProtectedRoute>
              <MainLayout>
                <AllTasks />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/notes" element={
            <ProtectedRoute>
              <MainLayout>
                <AllNotes />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/completed" element={
            <ProtectedRoute>
              <MainLayout>
                <CompletedTasks />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          {/* Catch-all route for unknown paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
