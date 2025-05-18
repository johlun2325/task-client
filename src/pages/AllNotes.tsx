import Notes from '../components/notes/Notes';

const AllNotes = () => {
    return (
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">Manage Your Notes</h2>
        
        <div className="bg-white p-6 rounded-lg shadow w-full">
          <Notes />
        </div>
      </div>
    );
  };
  
  export default AllNotes;
