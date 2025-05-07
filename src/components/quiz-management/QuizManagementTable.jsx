import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { formatToDateTimeString } from "../../utilities";
import { deleteQuiz } from "../../api/apiService";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const QuizManagementTable = ({ data = [], onDelete = () => {} }) => {
  const handleDelete = async (quizId) => {
    try {
      await deleteQuiz(quizId);
      // setData((prevData) => prevData.filter((quiz) => quiz.quizId !== quizId));
      // alert("Quiz deleted successfully.");
      await Swal.fire({
        title: "Quiz Deleted Successfully!",
        icon: "success",
        draggable: true
      });
      onDelete(quizId);

    } catch (error) {
      console.error("Failed to delete quiz:", error);
      Swal.fire("Error", "Failed to delete quiz.", "error");
    }
  };

  const navigate = useNavigate();
  const handleEdit = async (quizId) => {
    navigate(`/admin/edit/${quizId}`);
  };

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
              <td>{quiz.duration} min</td>
              <td>{formatToDateTimeString(quiz.createdAt)}</td>
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
