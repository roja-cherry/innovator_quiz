import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CountdownTimer = ({ timer = 0.5, onTimeUp = () => {} }) => {
  const [timeLeft, setTimeLeft] = useState(timer * 60);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            if (onTimeUp) onTimeUp();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onTimeUp]);

  // Convert seconds back to minutes:seconds format
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className="quiz-timer bg-light p-2 rounded d-inline-block">
      CountDown
      <span className={`h4 font-weight-bold ${timeLeft <= 10 ? 'text-danger' : 'text-primary'}`}>
        {formatTime(minutes)}:{formatTime(seconds)}
      </span>
      {timeLeft === 0 && <span className="ml-2 text-danger">Time's up!</span>}
    </div>
  );
};

export default CountdownTimer;
