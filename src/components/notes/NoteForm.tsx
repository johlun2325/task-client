import { useState } from 'react';

const NoteForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();        
    setTitle('');
    setContent('');
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="noteTitle" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="noteTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          required
        />
      </div>
      
      <div>
        <label htmlFor="noteContent" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="noteContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md"
      >
        Save Note
      </button>
    </form>
  );
};

export default NoteForm;
