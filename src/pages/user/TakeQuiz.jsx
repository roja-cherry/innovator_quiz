import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TakeQuiz.scss";
import CountdownTimer from "../../components/schedule/CountDownTimer";

import { useAppContext } from "../../context/AppContext";
import { goFullScreen } from "../../utilities";

function TakeQuiz() {
  const { scheduleId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setTitle } = useAppContext();

  const handleTimeUp = () => {
    alert("Time is up!");
  };

  useEffect(() => {
    goFullScreen();
    axios
      .get(`http://localhost:8080/api/participant/schedule/${scheduleId}/quiz`)
      .then((response) => {
        console.log("quizData response:", response.data);

        setQuizData(response.data);
        setTitle(response.data.schedule.quizTitle);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quiz data", error);
        setLoading(false);
      });
  }, [scheduleId, setTitle]);

  if (loading) return <div>Loading Quiz...</div>;
  if (!quizData) return <div>Quiz not found</div>;

  return (
    <>
      <div className="row min-vh-100 take-quiz-container">
        <div className="cold-md-9 questions-container">
          {quizData.questions.map((questionObject, questionIndex) => (
            <div key={questionObject.questionId} className="question-block">
              <h4 className="question-text">
                Q{questionIndex + 1}. {questionObject.question}
              </h4>
              <div className="options-row">
                {[
                  questionObject.option1,
                  questionObject.option2,
                  questionObject.option3,
                  questionObject.option4,
                ].map((optionText, optionIndex) => (
                  <label key={optionIndex} className="option-label">
                    <input
                      type="radio"
                      name={questionObject.questionId}
                      value={optionText}
                    />
                    {optionText}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button className="submit-button">Submit</button>
        </div>
      </div>
      {quizData?.timer && (
        <div className="countdown-wrapper">
          <CountdownTimer timer={quizData?.timer} onTimeUp={handleTimeUp} />
        </div>
      )}
    </>
  );
}

export default TakeQuiz;
