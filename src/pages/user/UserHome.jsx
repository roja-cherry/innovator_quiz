import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { STATUS_CLASSNAME } from "../../utilities";
import { getUserHomePageQuizzes } from "../../api/apiService";
import "./UserHome.scss";
import { useAuth } from "../../context/AuthContext";
import { useAppContext } from "../../context/AppContext";

const UserHome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const { setTitle } = useAppContext();

  useEffect(() => {
    if (!user) return;
    setTitle("My Quizzes");
    getUserHomePageQuizzes(user.userId)
      .then((response) => {
        const mapped = response.data
          .sort((a, b) => {
            const priority = {
              ACTIVE: 0,
              COMPLETED: 2,
            };
            return priority[a.status] - priority[b.status];
          })
          .map((item) => ({
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
  }, [user]);

  const handleTakeQuiz = (scheduleId) => navigate(`/start/${scheduleId}`);
  const handleViewSummary = (scheduleId) =>
    navigate(`/leaderboard/${scheduleId}`);
  const handleLeaderboard = () => navigate("/leaderboard/global");

  //   if (loading) return <div>Loading quizzes...</div>;
  //   if (!user) return <div>Please log in</div>;

  return (
    <div className="user-home-container" style={{ paddingTop: "8rem" }}>
      <header className="user-home-header d-flex justify-content-end">
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
                      className="btn btn-primary"
                      onClick={() => handleTakeQuiz(quiz.scheduleId)}
                    >
                      Take Quiz
                    </button>
                  )}
                  {quiz.status === "COMPLETED" || quiz.isAttempted ? (
                    <button
                      className="btn btn-outline-primary"
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
