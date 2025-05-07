import React from "react";
//import { FaEdit, FaTrash } from "react-icons/fa";
import { LiaEdit } from "react-icons/lia";
import { LiaTrashAltSolid } from "react-icons/lia";
import { formatToDateTimeString } from "../../utilities";
import { deleteQuiz } from "../../api/apiService";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const QuizManagementTable = ({ data = [], onDelete = () => {} }) => {
  const handleDelete = async (quizId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton: "btn btn-danger bg-danger",
        cancelButton: "btn btn-outline-primary",
      },
    });

    if (confirm.isDenied || confirm.isDismissed) {
      return;
    }

    try {
      await deleteQuiz(quizId);
      await Swal.fire({
        title: "Quiz Deleted Successfully!",
        icon: "success",
        draggable: true,
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
    <div className="mt-5">
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
              <td scope="row">
                <Link to={`/admin/quiz/${quiz.quizId}`}>{quiz.quizName}</Link>
              </td>
              <td>{quiz.duration} min</td>
              <td>{formatToDateTimeString(quiz.createdAt)}</td>
              <td>
                <LiaEdit
                  style={{
                    color: "#727171",
                    cursor: "pointer",
                    marginRight: "10px",
                    fontSize: "1.5rem",
                  }}
                  onClick={() => handleEdit(quiz.quizId)}
                />
                <LiaTrashAltSolid
                  className="ms-2"
                  style={{
                    color: "red",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                  }}
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
