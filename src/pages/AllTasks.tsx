import TaskList from '../components/tasks/Tasks';

const AllTasks = () => {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-6">Manage Your Tasks</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">          
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Your Tasks</h3>
              <TaskList />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default AllTasks;
