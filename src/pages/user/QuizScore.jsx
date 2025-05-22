import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaTrophy, FaAward, FaThumbsUp } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";
import { getAttempt } from "../../api/apiService";

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
        const resp = await getAttempt(attemptId);
        const data = resp.data;

        setQuizData({
          score: data.score,
          maxScore: data.maxScore,
          quizName: data.quizName,
        });

        setTitle(data.quizName);
      } catch (error) {
        const errorMessage = error.response?.data?.message ?? error?.message;
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
        });
      } finally {
        // Optionally handle loading here
        // setLoading(false);
      }
    };

    if (attemptId) {
      fetchQuizAttempt();
    }
  }, [attemptId]);

  const { score, maxScore, quizName } = quizData;
  const percentage = Math.round((score / maxScore) * 100);
  const passed = percentage >= 50;

  const result = useMemo(() => {
    if (percentage < 10) {
      return "Better Luck Next Time";
    } else if (percentage < 50) {
      return "Keep Trying!!";
    } else if (percentage < 90) {
      return "Good Job";
    } else {
      return "Excellent Performance";
    }
  }, [percentage]);

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
              <div className="d-flex flex-column align-items-center justify-content-center">
                {passed ? (
                  <FaTrophy className="display-4 me-3" />
                ) : (
                  <FaThumbsUp className="display-4 me-3" />
                )}
                <div className="quiz-result-container p-4 bg-gray-100 rounded shadow-md text-center max-w-md mx-auto">
                  <h2 className="text-2xl font-semibold mb-2 text-indigo-700">
                    {result}
                  </h2>
                  <p className="text-gray-700 text-lg">
                    🎉 You’ve successfully completed the quiz:{" "}
                    <strong>{quizName}</strong>!
                  </p>
                </div>
              </div>
            </div>

            <div className="card-body p-4">
              <div className="text-center mb-4">
                <div className="display-4 fw-bold text-dark">
                  {percentage}%
                </div>
                <div className="text-muted">Overall Score</div>
              </div>

              {/* <div className="progress mb-4" style={{ height: "20px" }}>
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
              </div> */}

              <div className={`text-center my-3`}>
                <Link
                  to={`/leaderboard/${scheduleId}`}
                  className={`btn btn-outline-dark`}
                  role="button"
                >
                  Leadership Board
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScore;
