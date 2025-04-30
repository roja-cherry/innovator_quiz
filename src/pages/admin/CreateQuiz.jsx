import CreateQuizForm from "../../components/CreateQuizForm";
import "./QuizFormPage.scss"

const CreateQuiz = () => {
  return (
    <section className="container-fluid p-5">
      <h2>Create New Quiz</h2>
      <div className="quiz-form-container p-5 mt-4">
        <CreateQuizForm />
      </div>
    </section>
  );
};
export default CreateQuiz;
