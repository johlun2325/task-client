import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/Home';
import CreateTask from './pages/CreateTask';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks" element={<CreateTask />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
