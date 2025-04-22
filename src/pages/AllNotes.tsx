import Notes from '../components/notes/Notes';

const AllNotes = () => {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-6">Manage Your Notes</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Your Notes</h3>
              <Notes />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default AllNotes;
