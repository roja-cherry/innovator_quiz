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
    <section className="container-fluid p-5">
      <h2>{quizData?.quiz?.quizName} Questions</h2>
      <div className="row mt-4">
        {/* Left column: Quiz Questions */}
        <div className="col-md-6">
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

        {/* Right column: Schedules Table */}
        <div className="col-md-6 quiz-management-container table-responsive">
          <h5 className="my-4">Scheduled Sessions</h5>
          <div className="table-responsive" key={schedules?.length}>
            {schedules?.length > 0 ? (
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th className="sl-no bg-light">SlNo</th>
                    <th className="bg-light">Status</th>
                    <th className="bg-light">Start Time</th>
                    <th className="bg-light">End Time</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((schedule, index) => (
                    <tr key={schedule.id}>
                      <td className="sl-no">{index + 1}</td>
                      <td>
                        <span className={STATUS_CLASSNAME[schedule?.status]}>
                          {schedule.status}
                        </span>
                      </td>
                      <td>{formatToDateTimeString(schedule.startDateTime)}</td>
                      <td>{formatToDateTimeString(schedule.endDateTime)}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No schedules found for this quiz.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
