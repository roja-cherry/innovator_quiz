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
    <section className="quiz-form-container">
      <EditQuizForm />
    </section>
  );
};

export default EditQuiz;
