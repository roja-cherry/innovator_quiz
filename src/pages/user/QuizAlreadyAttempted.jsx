import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const QuizAlreadyAttempted = ({ attemptId }) => {
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div
        className="card text-center shadow-sm border-0"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <div className="card-body p-4">
          <div className="mb-4 text-success">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h4 className="card-title mb-3 fw-bold">Quiz Already Attempted</h4>
          <p className="card-text text-muted mb-4">
            You have already completed this quiz. Would you like to review your
            answers or try again?
          </p>
          <div className="d-grid gap-3">
            <Link
              className="btn btn-outline-primary py-2"
              to={`/quiz-score/${attemptId}`}
            >
              View Results
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizAlreadyAttempted;
