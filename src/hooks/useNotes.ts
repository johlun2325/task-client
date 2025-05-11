import { useState, useEffect } from 'react';
import { apiService } from '../services/ApiService'
import { Note } from '../types/Note';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response: Note[] = await apiService.note.getAll();
        setNotes(response);
        setLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch notes';
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return { notes, loading, error };
};
