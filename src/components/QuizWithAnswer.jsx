import React from "react";
import "./QuizWithAnswer.scss";

export const QuizWithAnswer = ({ question, number }) => {
  const options = [
    { label: question.options1 },
    { label: question.options2 },
    { label: question.options3 },
    { label: question.options4 },
  ];

  return (
    <div className="quiz-card mt-4">
      <p className="quiz-question">
        {number}. {question.question}
      </p>
      <div className="quiz-options-grid">
        <div className="quiz-option">
          <input
            type="radio"
            name={`question-${question.option1}`}
            checked={question.correctAnswer === question.option1}
            readOnly
            className="quiz-radio"
          />
          <label>{question.option1}</label>
        </div>
        <div className="quiz-option">
          <input
            type="radio"
            name={`question-${question.option2}`}
            checked={question.correctAnswer === question.option2}
            readOnly
            className="quiz-radio"
          />
          <label>{question.option2}</label>
        </div>
        <div className="quiz-option">
          <input
            type="radio"
            name={`question-${question.option3}`}
            checked={question.correctAnswer === question.option3}
            readOnly
            className="quiz-radio"
          />
          <label>{question.option3}</label>
        </div>
        <div className="quiz-option">
          <input
            type="radio"
            name={`question-${question.option4}`}
            checked={question.correctAnswer === question.option4}
            readOnly
            className="quiz-radio"
          />
          <label>{question.option4}</label>
        </div>
      </div>
    </div>
  );
};
