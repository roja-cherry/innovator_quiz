import React, { useState, useEffect } from "react";
import "./dashboard.scss";
import { getAllSchedules } from "../../../api/apiService";
import { formatToDateTimeString } from "../../../utilities";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    fetchAllSchedules();
  }, []);

  const fetchAllSchedules = async () => {
    try {
      const response = await getAllSchedules();
      setSchedules(response.data);
    } catch (error) {
      console.error("Failed to fetch scheduled quizzes:", error);
      toast.error("Failed to load scheduled quizzes");
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
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule.id}>
                <td>{schedule.quizTitle}</td>
                <td>{formatToDateTimeString(schedule.startDateTime)}</td>
                <td>{formatToDateTimeString(schedule.endDateTime)}</td>
                <td>{schedule.status}</td>
                <td>
                  <button
                    className="btn btn-dark btn-sm"
                    onClick={() =>
                      navigate(`/admin/quiz-management/quiz/${schedule.quizId}`)
                    }
                  >
                    View
                  </button>

                  <button className="btn btn-primary btn-sm ms-2">Edit</button>
                </td>
              </tr>
            ))}

            {schedules.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No scheduled quizzes found.
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
