import React from "react";
//import { FaEdit, FaTrash } from "react-icons/fa";
import { LiaEdit } from "react-icons/lia";
import { LiaTrashAltSolid } from "react-icons/lia";
import {
  formatToDateTimeString,
  getStatusClassName,
  STATUS_CLASSNAME,
} from "../../utilities";
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
      const errorMessage =
        error?.response?.data?.message || "Failed to delete quiz.";
    
      Swal.fire("Error", errorMessage, "error");
    }
  };

  const navigate = useNavigate();
  const handleEdit = async (quizId) => {
    navigate(`/admin/quiz-management/edit/${quizId}`);
  };

  return (
    <div className="mt-5">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col" className="bg-light">
              Quiz Title
            </th>
            <th scope="col" className="bg-light">
              Timer
            </th>
            <th scope="col" className="bg-light">
              Created At
            </th>
            <th scope="col" className="bg-light">
              Scheduled
            </th>
            <th scope="col" className="bg-light">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No data available
              </td>
            </tr>
          ) : (
            data.map((quiz, index) => (
              <tr key={index}>
                <td scope="row">
                  <Link
                    to={`/admin/quiz-management/quiz/${quiz.quizId}`}
                    className="quiz-name"
                  >
                    {quiz.quizName}
                  </Link>
                </td>
                <td>{quiz.timer} min</td>
                <td>{formatToDateTimeString(quiz.createdAt)}</td>
                <td>
                  <span className={STATUS_CLASSNAME[quiz?.isScheduled]}>{quiz?.isScheduled ? "Yes" : "No"}</span>
                  {/* {quiz.isScheduled ? (
                    <span className="badge bg-warning text-dark">Yes</span>
                  ) : (
                    <span className="badge bg-secondary">No</span>
                  )} */}
                </td>
                <td>
                  <LiaEdit
                    className={`action-btn me-3 text-black ${
                      quiz?.isScheduled ? "btn-disabled" : ""
                    }`}
                    onClick={() => {
                      if (!quiz?.isScheduled) handleEdit(quiz.quizId);
                    }}
                  />
                  <LiaTrashAltSolid
                    className={`ms-2 action-btn text-danger ${
                      quiz?.isScheduled ? "btn-disabled" : ""
                    }`}
                    onClick={() => {
                      if (!quiz?.isScheduled) handleDelete(quiz.quizId);
                    }}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default QuizManagementTable;
