import React from "react";
import { useParams } from "react-router-dom";

export const ViewQuiz = () => {
  let { id } = useParams();

  return (
    <section className="container-fluid quiz-management-container p-5">
      <h2>Quiz Details</h2>
      <div className="mt-4">{id}</div>
    </section>
  );
};
