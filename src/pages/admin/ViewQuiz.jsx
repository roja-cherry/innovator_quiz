import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { QuizWithAnswer } from "../../components/QuizWithAnswer";
import { getQuizWithQuestions } from "../../api/apiService";
import { getSchedulesByQuizId } from "../../api/apiService";
import { formatToDateTimeString, STATUS_CLASSNAME } from "../../utilities";

export const ViewQuiz = () => {
  let { id } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizAndSchedules = async () => {
      try {
        const [quizWithQuestions, schedulesForQuiz] = await Promise.all([
          getQuizWithQuestions(id),
          getSchedulesByQuizId(id),
        ]);

        setQuizData(quizWithQuestions?.data);
        setSchedules(schedulesForQuiz?.data);
      } catch (error) {
        console.error("Error fetching quiz or schedules:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizAndSchedules();
  }, [id]);

  if (loading) {
    return <p>Loading quiz...</p>;
  }

  return (
    <section className="container-fluid py-5 px-5">
      <h2 className="text-center">{quizData?.quiz?.quizName} Questions</h2>
      <div className="d-flex justify-content-center mt-6 ">
        {/* Left column: Quiz Questions */}
        <div className="w-75">
          <div className="quiz-list">
            {quizData?.questions.map((question, index) => (
              <QuizWithAnswer
                question={question}
                key={question.questionId}
                number={index + 1}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
