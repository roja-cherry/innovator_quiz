import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AttendQuiz() {
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
    <div>
      <h2>{quizData.quiz.quizName}</h2>
      <h3>TIMER:{quizData.quiz.timer}</h3>

      {quizData.questions.map((questionObject, questionIndex) => (
        <div key={questionObject.questionId}>
          <h4>
            Q{questionIndex + 1}. {questionObject.question}
          </h4>
          {[
            questionObject.option1,
            questionObject.option2,
            questionObject.option3,
            questionObject.option4,
          ].map((optionText, optionIndex) => (
            <label
              key={optionIndex}
              style={{ display: "block", marginBottom: "4px" }}
            >
              <input
                type="radio"
                name={questionObject.questionId} 
                value={optionText} 
              />
              {optionText} 
            </label>
          ))}
        </div>
      ))}
      <button>submit</button>
    </div>
  );
}
export default AttendQuiz;
