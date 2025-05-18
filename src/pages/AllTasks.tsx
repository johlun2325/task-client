import TaskList from '../components/tasks/Tasks';

const AllTasks = () => {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-6">Manage Your Tasks</h2>
      
      <div className="bg-white p-6 rounded-lg shadow w-full">
        <TaskList />
      </div>
    </div>
  );
};
  
  export default AllTasks;
