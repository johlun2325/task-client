import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/Home';
import AllTasks from './pages/AllTasks';
import AllNotes from './pages/AllNotes';
import CompletedTasks from './pages/CompletedTasks';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks" element={<AllTasks />} />
          <Route path="/notes" element={<AllNotes />} />
          <Route path="/completed" element={<CompletedTasks />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
