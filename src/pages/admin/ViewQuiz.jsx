import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QuizWithAnswer } from "../../components/QuizWithAnswer";
import { getQuizWithQuestions } from "../../api/apiService";

export const ViewQuiz = () => {
  let { id } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizAndSchedules = async () => {
      try {
        const quizWithQuestions = await getQuizWithQuestions(id);
        setQuizData(quizWithQuestions?.data);
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
