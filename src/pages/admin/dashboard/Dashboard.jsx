import React, { useState, useEffect } from "react";
import "./dashboard.scss";
import { getQuizList ,statusActivate} from "../../../api/apiService";
import { formatToDateTimeString } from "../../../utilities";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchAllQuizzes();
  }, []);

  const fetchAllQuizzes = async () => {
    try {
      const response = await getQuizList({ status: "PUBLISHED" });
      setQuizzes(response.data);
    } catch (error) {
      console.error("Failed to fetch quizzes:", error);
      toast.error("Failed to load quizzes");
    }
  };

  const handleToggle = async (quizId, newStatus) => {
    try {
      setQuizzes((prevQuizzes) =>
        prevQuizzes.map((quiz) =>
          quiz.quizId === quizId ? { ...quiz, isActive: newStatus } : quiz
        )
      );
      await statusActivate(quizId, newStatus);
      toast.success("Quiz status updated successfully");
    } catch (error) {
      toast.error("Failed to update quiz status");
      console.error("Toggle error:", error);
    }
  };

  return (
    <section className="container-fluid quiz-management-container p-5">
      <h2>Dashboard</h2>

      <div className="mt-4">
        <table className="quiz-table">
          <thead>
            <tr>
              <th>Quiz Title</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Act/Inact</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz.quizId}>
                <td>{quiz.quizName}</td>
                <td>{formatToDateTimeString(quiz.quizStartDateTime)}</td>
                <td>{formatToDateTimeString(quiz.quizEndDateTime)}</td>
                <td>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id={`switch-${quiz.quizId}`}
                      checked={quiz.isActive}
                      onChange={() => handleToggle(quiz.quizId, !quiz.isActive)}
                    />
                  </div>
                </td>

                <td>
                  <button className="btn btn-dark btn-sm">View</button>

                  <button className="btn btn-primary btn-sm ms-2">Edit</button>
                </td>
              </tr>
            ))}

            {quizzes.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No quizzes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Dashboard;
