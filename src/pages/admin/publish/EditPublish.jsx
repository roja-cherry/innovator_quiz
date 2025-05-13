import ScheduleForm from "../../../components/schedule/ScheduleForm";

export const EditPublish = () => {
  return (
    <section className="container-fluid p-5 publish-page">
      <h2>Re-Schedule Quiz</h2>
      <div className="quiz-form-container p-5 mt-4">
        <ScheduleForm isEdit />
      </div>
    </section>
  );
};
