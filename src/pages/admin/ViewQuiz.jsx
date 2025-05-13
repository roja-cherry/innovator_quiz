import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QuizWithAnswer } from "../../components/QuizWithAnswer";
import { getQuizWithQuestions } from "../../api/apiService";

export const ViewQuiz = () => {
  let { id } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await getQuizWithQuestions(id);
        console.log("Fetched quiz data:", response?.data);
        setQuizData(response?.data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  if (loading) {
    return <p>Loading quiz...</p>;
  }

//   if (!quizData?.quizId) {
//     return <p>Quiz not found or no questions available!</p>;
//   }

  return (
    <section className="container-fluid p-5">
      <h2>{quizData.quiz.quizName}</h2>
      <div className="quiz-list">
        {quizData.questions.map((question, index) => (
          <QuizWithAnswer 
            question={question} 
            key={question.questionId} 
            number={index + 1} 
          />
        ))}
      </div>
    </section>
  );
};
