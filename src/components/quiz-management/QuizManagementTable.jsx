import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const QuizManagementTable = ({ data = [], onDelete = () => {} }) => {

  const handleDelete = async (quizId) => {
    try {
      await deleteQuiz(quizId);
      setData((prevData) => prevData.filter((quiz) => quiz.quizId !== quizId));
      alert("Quiz deleted successfully.");
    } catch (error) {
      console.error("Failed to delete quiz:", error);
      alert("Failed to delete quiz.");
    }
  };

  const handleEdit = async (quizId) => {};

  return (
    <div className="mt-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Quiz Title</th>
            <th scope="col">Timer</th>
            <th scope="col">Created At</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((quiz, index) => (
            <tr key={index}>
              <td scope="row">{quiz.quizName}</td>
              <td>{quiz.duration}</td>
              <td>{quiz.createdAt}</td>
              <td>
                <FaEdit
                  style={{ cursor: "pointer", marginRight: "10px" }}
                  onClick={() => handleEdit(quiz.quizId)}
                />
                <FaTrash
                  className="ms-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(quiz.quizId)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizManagementTable;
