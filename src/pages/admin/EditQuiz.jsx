import { useEffect } from "react";
import EditQuizForm from "../../components/EditQuizForm";
import { useAppContext } from "../../context/AppContext";
import "./QuizFormPage.scss";

const EditQuiz = () => {
  const { setTitle } = useAppContext();

  useEffect(() => {
    setTitle("Update Quiz");
    return () => setTitle("");
  }, []);

  return (
    <section className="container-fluid p-5">
      <h2>Edit Quiz</h2>
      <div className="quiz-form-container p-5 mt-4">
        <EditQuizForm />
      </div>
    </section>
  );
};

export default EditQuiz;
