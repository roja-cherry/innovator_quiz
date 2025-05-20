import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TakeQuiz.scss";

function TakeQuiz() {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/quiz/${quizId}`)
      .then((response) => {
        console.log(response.data);
        setQuizData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quiz data", error);
        setLoading(false);
      });
  }, [quizId]);
  if (loading) {
    return <div>Loading Quiz </div>;
  }
  if (!quizData) return <div>quiz not found</div>;

  return (
    <div className="take-quiz">
        
      <div className="quiz-header">
        <h2 className="quiz-title">{quizData.quiz.quizName}</h2>
        <div className="quiz-timer-fixed">TIMER: {quizData.quiz.timer}</div>
      </div>
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
  );
}
export default TakeQuiz;
