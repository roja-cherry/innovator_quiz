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
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ACTIVE");
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

        setAllQuizzes(mapped); // ✅ store all
      })
      .catch((error) => {
        console.error("Failed to fetch user quizzes:", error);
      });
  }, [user]);

  useEffect(() => {
    if (statusFilter === "ALL") {
      setQuizzes(allQuizzes);
    } else {
      const filtered = allQuizzes.filter((q) => q.status === statusFilter);
      setQuizzes(filtered);
    }
  }, [statusFilter, allQuizzes]);

  const handleTakeQuiz = (scheduleId) => navigate(`/start/${scheduleId}`);
  const handleViewSummary = (scheduleId) =>
    navigate(`/leaderboard/${scheduleId}`);
  const handleLeaderboard = () => navigate("/leaderboard/global");

  return (
    <div className="user-home-container" style={{ paddingTop: "8rem" }}>
      <header className="user-home-header d-flex justify-content-between align-items-center mb-3">
        <div>
          <select
            className="form-select w-auto"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All</option>
            <option value="ACTIVE">Active</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
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

                  {quiz.status === "ACTIVE" && quiz.isAttempted && (
                    <div className="tooltip-container">
                      <button className="btn btn-outline-primary btn-disabled">
                        View Summary
                      </button>
                      <span className="tooltip-text">
                        Summary will be available after the quiz period ends
                      </span>
                    </div>
                  )}

                  {quiz.status === "COMPLETED" && (
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => handleViewSummary(quiz.scheduleId)}
                    >
                      View Summary
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {quizzes.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center">
                  No quizzes found for selected status.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserHome;
