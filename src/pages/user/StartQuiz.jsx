// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const StartQuiz = () => {
//   const navigate = useNavigate();

//   const handleStart = () => {
//     navigate('/quiz'); // Adjust the route
//   };

//   return (
//     <div className="start-quiz-container">
//       <button className="btn btn-primary mt-3" onClick={handleStart}>
//         Start Quiz
//       </button>
//     </div>
//   );
// };

// export default StartQuiz;


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const StartQuiz = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const [quizStatus, setQuizStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/api/quiz/${quizId}`)
      .then(res => res.json())
      .then(data => {
        setQuizStatus(data.quiz?.status);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching quiz status:', error);
        setQuizStatus('ERROR');
        setLoading(false);
      });
  }, [quizId]);

  const handleStart = () => {
    if (quizStatus === 'ACTIVE') {
      navigate(`/quiz/${quizId}`);
    }
  };

  const getStatusMessage = () => {
    if (loading) return 'Checking quiz status...';
    switch (quizStatus) {
      case 'CREATED':
        return 'Quiz is created but not yet published';
      case 'PUBLISHED':
        return 'Quiz is published but not yet active';
      case 'ACTIVE':
        return 'Quiz is ready to begin!';
      case 'COMPLETED':
        return 'Quiz has already been completed';
      default:
        return 'Unable to determine quiz status';
    }
  };

  return (
    <div className="start-quiz-container bg-light min-vh-100 d-flex flex-column justify-content-center align-items-center p-4">
      
      {/* Instructions Section */}
      <div className="instructions bg-white p-4 mb-4 rounded shadow-sm" style={{ width: '100%', maxWidth: '500px' }}>
        <h3 className="text-primary mb-3">Instructions</h3>
        <ul className="text-muted">
          <li>Make sure you are in a quiet environment before starting the quiz.</li>
          <li>Each question may have a time limit, so read carefully and respond quickly.</li>
          <li>Do not refresh or close the browser tab once the quiz starts.</li>
          <li>Your progress will not be saved if you exit mid-way.</li>
          <li>Click "Start Quiz" only when you are ready to begin.</li>
        </ul>
      </div>
  
      {/* Quiz Status Card */}
      <div className="card shadow-sm p-4 mb-4 bg-white rounded" style={{ width: '100%', maxWidth: '500px' }}>
        <div className="card-body text-center">
          <h2 className="card-title mb-4 text-primary">Quiz Status</h2>
  
          <div className={`status-indicator mb-4 ${
            quizStatus === 'ACTIVE' ? 'text-success' : 
            quizStatus === 'ERROR' ? 'text-danger' : 'text-muted'
          }`}>
            <i className={`bi ${
              loading ? 'bi-hourglass' :
              quizStatus === 'ACTIVE' ? 'bi-check-circle-fill' :
              quizStatus === 'COMPLETED' ? 'bi-flag-fill' :
              'bi-info-circle-fill'
            }`} style={{ fontSize: '3rem' }}></i>
          </div>
  
          <p className="card-text lead mb-4">
            {getStatusMessage()}
          </p>
  
          <button
            className="btn btn-primary mt-3"
            onClick={handleStart}
            disabled={quizStatus !== 'ACTIVE'}
          >
            Start Quiz
          </button>
  
          {quizStatus !== 'ACTIVE' && !loading && (
            <p className="text-muted mt-3 small">
              Please wait for the quiz to be activated
            </p>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default StartQuiz;