import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { STATUS_CLASSNAME } from "../../utilities";
import { getUserHomePageQuizzes } from "../../api/apiService";
import { useAuth } from "../../hooks/useAuth";
import "./UserHome.scss";

const UserHome = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    if (!user || loading) return;

    getUserHomePageQuizzes(user.userId)
      .then((response) => {
        const mapped = response.data.map((item) => ({
          id: item.scheduleId,
          title: item.quizName,
          status: item.status,
          statusText:
            item.status === "ACTIVE"
              ? "Active"
              : item.status === "COMPLETED"
              ? "Completed"
              : item.status === "PUBLISHED"
              ? "Published"
              : "Cancelled",
          isAttempted: item.isAttempted,
          scheduleId: item.scheduleId,
        }));
        setQuizzes(mapped);
      })
      .catch((error) => {
        console.error("Failed to fetch user quizzes:", error);
      });
  }, [user, loading]);

  const handleTakeQuiz = (scheduleId) => navigate(`/start/${scheduleId}`);
  const handleViewSummary = (scheduleId) => navigate(`/summary/${scheduleId}`);
  const handleLeaderboard = () => navigate("/leaderboard");

//   if (loading) return <div>Loading quizzes...</div>;
//   if (!user) return <div>Please log in</div>;

  return (
    <div className="user-home-container">
      <header className="user-home-header">
        <h1>My Quizzes</h1>
        <button
          className="leaderboard-button badge bg-primary text-white"
          onClick={handleLeaderboard}
        >
          Leaderboard
        </button>
      </header>

      <div className="quiz-table-container">
        <table className="quiz-table">
          <thead>
            <tr>
              <th>Quiz Title</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz.id}>
                <td>{quiz.title}</td>
                <td>
                  <span className={STATUS_CLASSNAME[quiz.status]}>
                    {quiz.statusText}
                  </span>
                </td>
                <td className="actions-cell">
                  {quiz.status === "ACTIVE" && !quiz.isAttempted && (
                    <button
                      className="action-button take-quiz badge text-bg-success"
                      onClick={() => handleTakeQuiz(quiz.scheduleId)}
                    >
                      Take Quiz
                    </button>
                  )}
                  {quiz.status === "COMPLETED" || quiz.isAttempted ? (
                    <button
                      className="action-button view-summary badge text-bg-warning"
                      onClick={() => handleViewSummary(quiz.scheduleId)}
                    >
                      View Summary
                    </button>
                  ) : quiz.status === "PUBLISHED" ? (
                    <span className="badge text-bg-secondary">Coming Soon</span>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserHome;
