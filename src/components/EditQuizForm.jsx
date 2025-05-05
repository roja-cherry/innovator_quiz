import React, { useEffect, useState } from "react";
import FileUpload from "./file-upload/FileUpload";
import { editQuiz, getQuiz } from "../api/apiService";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditQuizForm = () => {
  const { id } = useParams(); // quiz ID from URL
  const [excelFile, setExcelFile] = useState(null);
  const [quizName, setQuizName] = useState("");
  const [duration, setDuration] = useState(5);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await getQuiz(id);
        setQuizName(data.quizName);
        setDuration(data.duration);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load quiz details", "error");
      }
    };

    fetchQuiz();
  }, [id]);

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
    if (excelFile) formData.set("file", excelFile);
    formData.set("quizName", quizName);
    formData.set("duration", duration);

    try {
      await editQuiz(formData, id);
      Swal.fire("Success", "Quiz updated successfully", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update quiz", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="quiz-form">
      <div>
        <label htmlFor="QuizTitle" className="form-label">
          Quiz Title :
        </label>
        <input
          value={quizName}
          type="text"
          className="form-control"
          id="quiztitle"
          placeholder=" Enter Quiz Title"
          required
          onChange={(e) => setQuizName(e.target.value)}
        />
      </div>

      <div className="d-flex align-items-center mb-2">
        <div className="mt-3 flex-1">
          <p className="m-0">
            <label htmlFor="duration" className="form-label">
              Duration :
            </label>
          </p>
          <input
            type="range"
            min={5}
            max={60}
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="form_range"
            style={{ accentColor: "black", width: "100%" }}
          />
        </div>
        <div className="border border-dark px-2 py-1 mt-5 ms-2 rounded">
          {duration} MIN
        </div>
      </div>

      <FileUpload
        file={excelFile}
        label="Re-Upload File"
        handleFileChange={handleFileChange}
      />

      <div className="text-center">
        <button className="btn btn-dark mt-3" type="submit">
          UPDATE
        </button>
      </div>
    </form>
  );
};

export default EditQuizForm;
