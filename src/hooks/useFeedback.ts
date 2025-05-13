import { useState, useEffect } from 'react';
import { apiService } from '../services/ApiService';
import { FeedbackEvent } from '../types/Feedback';

export const useFeedback = () => {
  const [feedback, setFeedback] = useState<FeedbackEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const data = await apiService.feedback.get();
        setFeedback(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch notes';
        setError(errorMessage);        
    } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  return { feedback, loading, error };
};
