import React from "react";
import ScheduleForm from "../../../components/schedule/ScheduleForm";

export const Publish = () => {
  return (
    <section className="container-fluid p-5 publish-page">
      <h2>Schedule Quiz</h2>
      <div className="quiz-form-container p-5 mt-4">
        <ScheduleForm />
      </div>
    </section>
  );
};
