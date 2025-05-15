import React from "react";
import { useParams } from "react-router-dom";

export const AttendQuiz = () => {
  const { id } = useParams();
  return <div>Attend Quiz : {id}</div>;
};
