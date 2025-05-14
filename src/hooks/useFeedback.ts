import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/ApiService';
import { FeedbackEvent } from '../types/Feedback';
import { feedbackPoller } from '../services/FeedbackPollerService';
import { useRefetch } from '../context/RefetchContext';

export const useFeedback = () => {
  const [feedback, setFeedback] = useState<FeedbackEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { trigger } = useRefetch();
  
  const fetchFeedback = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Manually fetching feedback data');
      const data = await apiService.feedback.get();
      setFeedback(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching feedback:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch feedback';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    const unsubscribe = feedbackPoller.subscribe(() => {
      console.log('Feedback poller notified update, fetching new data');
      fetchFeedback();
    });
    
    return () => {
      unsubscribe();
    };
  }, [fetchFeedback]);
  
  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);
  
  useEffect(() => {
    console.log('RefetchContext trigger changed, starting feedback polling');
    feedbackPoller.startPolling();
  }, [trigger]);
  
  return { 
    feedback, 
    loading, 
    error, 
    refetch: fetchFeedback,
    //manual polling if needed
    pollForNewFeedback: () => feedbackPoller.startPolling()
  };
};