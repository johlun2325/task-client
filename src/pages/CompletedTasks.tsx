
const CompletedTasks = () => {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-6">Compeleted tasks</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">          
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">No completed tasks yet</h3>

            </div>
          </div>
        </div>
      </div>
    );
  };

  export default CompletedTasks;
