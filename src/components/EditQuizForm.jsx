import React, { useEffect, useState } from "react";
import FileUpload from "./file-upload/FileUpload";
import { editQuiz, getQuiz } from "../api/apiService";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const EditQuizForm = () => {
  const { id } = useParams(); // quiz ID from URL
  const [excelFile, setExcelFile] = useState(null);
  const [quizName, setQuizName] = useState("");
  const [timer, setTimer] = useState(5);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await getQuiz(id);
        if (data.status === "COMPLETED") {
          toast.error("Can't edit the quiz, Quiz already exists");
          navigate(`/admin/quiz-management`);
        }
        setQuizName(data?.quiz?.quizName);
        setTimer(data?.quiz?.timer);
      } catch (err) {
        // Extracting the message from the backend response if available
        const errorMessage =
          err.response?.data?.message || "Failed to load quiz details";

        const res = await Swal.fire("Error", errorMessage, "error");
        if (res?.dismissed || res?.isConfirmed) {
          navigate("/");
        }
      }
    };

    fetchQuiz();
  }, [id]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length > 50) {
      setErrors({ quizName: "Quiz Title can't exceed 50 characters" });
      return;
    } else {
      setErrors({});
    }

    setQuizName(inputValue);
  };

  const handleFileChange = (e) => {
    const file = e.target?.files[0];

    if (file?.size > 10000000) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Maximum allowed size is 10MB",
      });
      return;
    }
    setExcelFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("file", excelFile);
    formData.set("quizName", quizName);
    formData.set("timer", timer);

    try {
      await editQuiz(formData, id);

      const confirm = await Swal.fire({
        title: "Quiz Updated successfully",
        icon: "success",
        confirmButtonText: "OK",
        draggable: true,
      });

      if (confirm.isDismissed || confirm.isConfirmed) {
        navigate("/admin/quiz-management");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update quiz";
      Swal.fire("Error", errorMessage, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="quiz-form">
      <div>
        <label htmlFor="QuizTitle" className="form-label">
          Quiz Title : {quizName}
        </label>
        <input
          value={quizName}
          type="text"
          className="form-control"
          id="quiztitle"
          placeholder=" Enter Quiz Title"
          maxLength={51}
          required
          onChange={handleInputChange}
        />
        {errors?.quizName && (
          <small style={{ color: "red" }}>{errors?.quizName}</small>
        )}
      </div>

      <div className="d-flex align-items-center mb-2">
        <div className="mt-3 flex-1">
          <p className="m-0">
            <label htmlFor="timer" className="form-label">
              Timer :
            </label>
          </p>
          <input
            type="range"
            min={5}
            max={60}
            id="timer"
            value={timer}
            onChange={(e) => setTimer(e.target.value)}
            className="form_range"
            autoComplete="off"
            style={{ width: "100%" }}
          />
        </div>
        <div className="border border-primary px-2 py-1 mt-5 ms-2 rounded">
          {timer} MIN
        </div>
      </div>

      <FileUpload
        file={excelFile}
        label="Re-Upload File"
        handleFileChange={handleFileChange}
      />

        <button className="btn btn-primary w-100 mt-5" type="submit">
          Update
        </button>
    </form>
  );
};

export default EditQuizForm;
