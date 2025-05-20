import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getScheduleForParticipant } from "../../api/apiService";
import { goFullScreen } from "../../utilities";

const StartQuiz = () => {
  const navigate = useNavigate();
  const { scheduleId } = useParams();
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const resp = await getScheduleForParticipant(scheduleId);
        setSchedule(resp.data);
      } catch (error) {
        const errorMessage = error.response?.data?.message ?? error?.message;
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    if (scheduleId) {
      fetchSchedule();
    }
  }, [scheduleId]);

  const handleStart = () => {
    if (schedule?.status === "ACTIVE") {
      goFullScreen();
      navigate(`/quiz/${schedule.quizId}`);
    }
  };

  const getStatusMessage = () => {
    if (loading || !schedule) return "Checking quiz status...";
    switch (schedule.status) {
      case "CANCELLED":
        return "Quiz is cancelled";
      case "PUBLISHED":
        return "Quiz is published but not yet active";
      case "ACTIVE":
        return "Quiz is ready to begin!";
      case "COMPLETED":
        return "Quiz has already been completed";
      default:
        return "Unable to determine quiz status";
    }
  };

  return (
    <div className="container-fluid min-vh-100 bg-light d-flex justify-content-center align-items-center px-3 px-md-5">
      <div className="row w-100" style={{ maxWidth: "1100px" }}>
        {/* Left: Instructions */}
        <div className="col-12 col-md-6 mb-4 mb-md-0">
          <div className="p-5 bg-white shadow rounded-3 h-100 d-flex flex-column justify-content-center">
            <h3 className="text-primary mb-4">📘 Instructions</h3>
            <ul className="text-secondary fs-5 ps-3">
              <li>Choose a quiet space before starting.</li>
              <li>Some questions may be timed.</li>
              <li>Do not refresh or close the window.</li>
              <li>Progress is not saved partway.</li>
              <li>Start only when you’re ready.</li>
            </ul>
          </div>
        </div>

        {/* Right: Quiz Info */}
        <div className="col-12 col-md-6">
          <div className="p-5 bg-white shadow rounded-3 h-100 d-flex flex-column justify-content-center align-items-center text-center">
            <h1 className="text-primary mb-3">{schedule?.quiz.quizName || "Quiz Title"}</h1>
            <p className="lead mb-4">{getStatusMessage()}</p>
            <button
              className="btn btn-primary btn-lg px-4"
              onClick={handleStart}
              disabled={schedule?.status !== "ACTIVE"}
            >
              Start Quiz
            </button>
            {schedule?.status !== "ACTIVE" && !loading && (
              <p className="text-muted mt-3 fs-6">
                Please wait for the quiz to become active.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartQuiz;
