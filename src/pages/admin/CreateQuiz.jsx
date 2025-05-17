import { useEffect } from "react";
import CreateQuizForm from "../../components/CreateQuizForm";
import { useAppContext } from "../../context/AppContext";
import "./QuizFormPage.scss";

const CreateQuiz = () => {
  const { setTitle } = useAppContext();

  useEffect(() => {
    setTitle("Create Quiz");
    return () => setTitle("");
  }, []);

  return (
    <section className="quiz-form-container p-5 mt-4">
      <CreateQuizForm />
    </section>
  );
};
export default CreateQuiz;
