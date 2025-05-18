import React from 'react';
import { useFeedback } from '../../hooks/useFeedback';

const Feedback: React.FC = () => {
  const { feedback, loading, error, refetch } = useFeedback();

  if (loading) return <div className="text-gray-500">Loading feedback...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  
  return (
    <div className="mt-2 p-4 bg-white">
      <div className="flex justify-between items-center mb-2">
        <button 
          onClick={refetch}
          className="px-3 py-1 bg-white-500 text-white text-sm rounded hover:bg-yellow-600">
          Refresh
        </button>
      </div>
      
      {feedback && feedback.length > 0 ? (
        <ul className="space-y-2">
          {feedback.map((event, index) => (
            <li 
              key={event.feedbackUid || `feedback-${index}`} 
              className="p-3 bg-blue-50 rounded-md"
            >
              <p className="text-sm text-gray-800">{event.feedback}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No feedback available at the moment.</p>
      )}
    </div>
  );
};

export default Feedback;
