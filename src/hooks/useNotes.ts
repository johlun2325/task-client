import { useEffect, useState, useCallback } from 'react';
import { Note } from '../types/Note';
import { apiService } from '../services/ApiService';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.note.getAll();
      setNotes(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch notes';
      setError(errorMessage);    } 
      finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return { notes, loading, error, refetch: fetchNotes };
};
