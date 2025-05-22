import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./TakeQuiz.scss";
import CountdownTimer from "../../components/schedule/CountDownTimer";
import { useAppContext } from "../../context/AppContext";
import { goFullScreen, USER_ROLES } from "../../utilities";
import { submitQuiz } from "../../api/apiService";
import { useAuth } from "../../context/AuthContext";

function TakeQuiz() {
  const { scheduleId } = useParams();
  const [answers, setAnswers] = useState({});
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setTitle } = useAppContext();
  const { user } = useAuth();
  const navigate = useNavigate();

  // ✅ Redirect if user is not logged in or role is not PARTICIPANT
  // useEffect(() => {
  //   if (!user || user.role !== USER_ROLES.PARTICIPANT) {
  //     navigate("/login", { replace: true });
  //   }
  // }, [user, navigate]);

  const handleSubmit = async () => {
    try {
      const response = await submitQuiz(user?.userId, scheduleId, answers);
      const { id } = response.data;
      navigate(`/quiz-score/${id}`, { replace: true });
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("There was an error submitting your quiz.");
    }
  };

  const handleTimeUp = () => {
    handleSubmit();
  };

  useEffect(() => {
    if (!user || !scheduleId) return;

    goFullScreen();

    axios
      .get(`http://localhost:8080/api/participant/schedule/${scheduleId}/quiz`)
      .then((response) => {
        const data = response.data;

        if (data.schedule.status !== "ACTIVE") {
          navigate(`/start/${scheduleId}`);
        }
        setQuizData(data);
        setTitle(data.schedule.quizTitle);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quiz data", error);
        setLoading(false);
      });
  }, [scheduleId, user, setTitle]);

  if (!user) return null; // Prevent rendering before redirect
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
                      onChange={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          [questionObject.questionId]: optionText,
                        }))
                      }
                      checked={
                        answers[questionObject.questionId] === optionText
                      }
                    />
                    {optionText}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>

      {quizData?.timer && (
        <div className="countdown-wrapper">
          <CountdownTimer timer={quizData.timer} key={quizData?.timer} onTimeUp={handleTimeUp} />
        </div>
      )}
    </>
  );
}

export default TakeQuiz;
