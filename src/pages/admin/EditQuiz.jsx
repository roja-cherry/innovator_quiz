import EditQuizForm from "../../components/EditQuizForm";
import "./QuizFormPage.scss";

const EditQuiz = () => {
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
