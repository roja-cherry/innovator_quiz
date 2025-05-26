import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CountdownTimer = ({ timer = 0.5, onTimeUp = () => {} }) => {
  // Initialize state from sessionStorage or props
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = sessionStorage.getItem("quizTimer");
    return savedTime ? parseInt(savedTime, 10) : timer * 60;
  });

  const [isRunning, setIsRunning] = useState(true);

  // Save to sessionStorage whenever timeLeft changes
  useEffect(() => {
    sessionStorage.setItem("quizTimer", timeLeft.toString());

    return () => sessionStorage.clear()
  }, [timeLeft]);

  // Timer logic
  useEffect(() => {
    let interval;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            onTimeUp();
            sessionStorage.removeItem("quizTimer"); // Clean up when done
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
      // Save final time when unmounting
      if (timeLeft > 0) {
        sessionStorage.setItem("quizTimer", timeLeft.toString());
      }
    };
  }, [isRunning, timeLeft, onTimeUp]);

  // Convert seconds to minutes:seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  // Calculate percentage for progress indicator (optional)
  const totalTime = timer * 60;
  const percentage = (timeLeft / totalTime) * 100;

  return (
    <div className="quiz-timer p-2 d-inline-block">
      <span
        className={`font-weight-bold rounded ${
          timeLeft <= 10 ? "text-danger" : "text-primary"
        }`}
      >
        {formatTime(minutes)}:{formatTime(seconds)}
      </span>
    </div>
  );
};

export default CountdownTimer;
