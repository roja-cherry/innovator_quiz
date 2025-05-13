import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QuizWithAnswer } from "../../components/QuizWithAnswer";
import { getQuizWithQuestions } from "../../api/apiService";
import { getSchedulesByQuizId } from "../../api/apiService";


export const ViewQuiz = () => {
  let { id } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchQuizAndSchedules = async () => {
      try {
        const response = await getQuizWithQuestions(id);
        setQuizData(response.data);
  
        const schedulesRes = await getSchedulesByQuizId(id);
        setSchedules(schedulesRes);
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

  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    return <p>Quiz not found or no questions available!</p>;
  }

  return (
    <section className="container-fluid p-5">
      <h2>{quizData.quiz.quizName} Questions</h2>
      <h3>Schedules</h3>
{schedules.length === 0 ? (
  <p>No schedules available for this quiz.</p>
) : (
  <table className="table table-striped">
    <thead>
      <tr>
        <th>Start</th>
        <th>End</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {schedules.map((schedule) => (
        <tr key={schedule.id}>
          <td>{new Date(schedule.startDateTime).toLocaleString()}</td>
          <td>{new Date(schedule.endDateTime).toLocaleString()}</td>
          <td>{schedule.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}
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
