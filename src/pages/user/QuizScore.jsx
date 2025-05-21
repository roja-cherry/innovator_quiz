import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaTrophy, FaAward } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";

const QuizScore = () => {
  const navigate = useNavigate();
  const { attemptId } = useParams();
  const { setTitle } = useAppContext();
  const [quizData, setQuizData] = useState({
    score: 0,
    maxScore: 10,
    quizName: "Quiz",
  });

  useEffect(() => {
    const fetchQuizAttempt = async () => {
      try {
        const response = await ;
        if (!response.ok) {
          throw new Error("Failed to fetch quiz attempt data");
        }
        const data = await response.json();
        setQuizData({
          score: data.score,
          maxScore: data.maxScore,
          quizName: data.quizName,
        });
        setTitle(data.quizName);
      } catch (error) {
        console.error("Error fetching quiz attempt:", error);
        // Optionally navigate to an error page or show a message
      }
    };
  
    if (attemptId) {
      fetchQuizAttempt();
    }
  }, [attemptId]);
  

  const { score, maxScore, quizName } = quizData;
  const percentage = Math.round((score / maxScore) * 100);
  const passed = percentage >= 60;

  const handleRetake = () => {
    navigate("/quizzes");
  };

  return (
    <div className="container py-5 mt-5">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-8">
          <div
            className={`card border-0 shadow-lg mb-4 ${
              passed ? "border-success" : "border-warning"
            }`}
          >
            <div
              className={`card-header ${
                passed ? "bg-success text-white" : "bg-warning text-dark"
              } py-4`}
            >
              <div className="d-flex align-items-center justify-content-center">
                {passed ? (
                  <FaTrophy className="display-4 me-3" />
                ) : (
                  <FaAward className="display-4 me-3" />
                )}
                <div>
                  <h2 className="mb-1">
                    {passed ? "Congratulations!" : "Good Try!"}
                  </h2>
                  <p className="mb-0">You completed {quizName}</p>
                </div>
              </div>
            </div>

            <div className="card-body p-4">
              <div className="text-center mb-4">
                <div className="display-4 fw-bold text-primary">
                  {percentage}%
                </div>
                <div className="text-muted">Overall Score</div>
              </div>

              <div className="progress mb-4" style={{ height: "20px" }}>
                <div
                  className={`progress-bar ${
                    passed ? "bg-success" : "bg-warning"
                  }`}
                  role="progressbar"
                  style={{ width: `${percentage}%` }}
                  aria-valuenow={percentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {percentage}%
                </div>
              </div>

              <div
                className={`alert ${
                  passed ? "alert-success" : "alert-warning"
                } text-center`}
              >
                {passed ? (
                  <span>You passed the quiz! Excellent work!</span>
                ) : (
                  <span>
                    You scored {percentage}%. Keep practicing to improve!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScore;
