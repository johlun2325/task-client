import { useState } from 'react';
import { useNotes } from '../../hooks/useNotes';
import { Note } from '../../types/Note';

import CreateNoteModal from './CreateNoteModal';

const Notes = () => {
  const { notes, loading, error, refetch } = useNotes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  
const handleEditNote = (note: Note) => {
   setSelectedNote(note);
   setIsModalOpen(true);
};

  if (loading) {
    return <p className="text-gray-500">Loading notes...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="h-full overflow-y-auto pr-2">
      {notes.length === 0 && (
        <p className="text-gray-500 mb-4">No notes yet. Create one!</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">

        <div
          className="bg-white border border-dashed border-gray-300 p-3 rounded flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors aspect-square"
          onClick={() => {
            setSelectedNote(null);
            setIsModalOpen(true);
          }}            >
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <p className="mt-1 text-xs text-gray-600">Add Note</p>
          </div>
        </div>

        {notes
        .slice()
        .sort((a, b) => b.updatedAt - a.updatedAt)
        .map((note) => (
          <div 
            key={note.uid}
            onClick={() => handleEditNote(note)}
            className="bg-yellow-100 p-3 rounded shadow-sm aspect-square transform hover:scale-105 hover:shadow-md cursor-pointer transition-all"
          >
            <h3 
            onClick={() => handleEditNote(note)}
            className="font-semibold text-gray-800 text-sm mb-1 truncate">{note.title}</h3>
            <p className="text-xs text-gray-700 line-clamp-4 break-words">
              {note.text}
            </p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <CreateNoteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreated={refetch}
          existingNote={selectedNote}
        />
      )}
    </div>
  );
};

export default Notes;
