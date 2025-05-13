import React from 'react';
import { useFeedback } from '../../hooks/useFeedback';

const Feedback: React.FC = () => {

    const { feedback, loading, error } = useFeedback();

  return (
    <div>
      {loading ? (
        <div>Loading feedback...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          {feedback.length > 0 ? (
            <ul>
              {feedback.map((event) => (
                <li key={event.userUid}>
                  <p>{event.feedback}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No feedback available at the moment.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Feedback;
