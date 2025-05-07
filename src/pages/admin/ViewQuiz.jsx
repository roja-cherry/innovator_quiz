import React from "react";
import { useParams } from "react-router-dom";

export const ViewQuiz = () => {
  let quizid = useParams()
  
  return (
    <div>
      <h2>ViewQuiz</h2>
      <label>Quiz Id : {quizid.id}</label>
    </div>
  );
};
