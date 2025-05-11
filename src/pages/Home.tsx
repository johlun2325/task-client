import Notes from '../components/notes/Notes';
import PriorityTasks from '../components/tasks/PriorityTasks';
import TaskList from '../components/tasks/Tasks';

const HomePage = () => {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
        
        <div className="w-full bg-white p-4 rounded-lg shadow h-[400px] mb-4">
          <h3 className="text-lg font-medium mb-3">Your Notes</h3>
          <div className="h-[calc(100%-2.5rem)] overflow-hidden">
            <Notes />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Reminders */}
          <div className="bg-white p-6 rounded-lg shadow h-96">
            <h3 className="text-lg font-medium mb-4">Reminders</h3>
            <div className="h-[calc(100%-2rem)] overflow-y-auto">
              {/* Content */}
            </div>
          </div>
          
          {/* Tasks */}
          <div className="bg-white p-6 rounded-lg shadow h-96">
            <h3 className="text-lg font-medium mb-4">All Tasks</h3>
            <div className="h-[calc(100%-2rem)] overflow-y-auto">
              <TaskList />
            </div>
          </div>
          
          {/* High Priority */}
          <div className="bg-white p-6 rounded-lg shadow h-96">
            <h3 className="text-lg font-medium mb-4">Priority</h3>
            <div className="h-[calc(100%-2rem)] overflow-y-auto">
              <PriorityTasks />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default HomePage;
