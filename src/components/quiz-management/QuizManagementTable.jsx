import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const QuizManagementTable = () => {
  const [data, setData] = useState([
    {
      quizId: 1,
      quizName: "ABC",
      createdAt: "June 1",
      duration: 10
    },
    {
      quizId: 2,
      quizName: "ABC",
      createdAt: "June 1",
      duration: 10
    },
    {
      quizId: 3,
      quizName: "ABC",
      createdAt: "June 1",
      duration: 10
    },
    {
      quizId: 4,
      quizName: "ABC",
      createdAt: "June 1",
      duration: 10
    }
  ]);

  return (
    <div className="container mt-4">
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
                <FaEdit style={{ cursor: "pointer", marginRight: "10px" }} />
                <FaTrash className="ms-2" style={{ cursor: "pointer" }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizManagementTable;
