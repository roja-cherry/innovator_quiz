import React, { useState } from "react";
import FileUpload from "./file-upload/FileUpload";
import { createQuiz } from "../api/apiService";
import toast from "react-hot-toast";

const CreateQuizForm = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [quizName, setQuizName] = useState("");
  const [duration, setDuration] = useState(5);

  const handleFileChange = (e) => {
    const file = e.target?.files[0];

    if (file?.size > 10000) {
      toast.error("Maximum allowed size is 10MB");
      return;
    }
    setExcelFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!excelFile) {
      toast.error("Please upload file")
      return
    }
    
    const formData = new FormData();
    formData.set("file", excelFile);
    formData.set("quizName", quizName);
    formData.set("duration", duration);

    try {
      await createQuiz(formData);
      toast.success("Quiz uploaded successfully")
    } catch (err) {
      console.log(err);
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
          onChange={(e) => setQuizName(e.target?.value)}
        />
      </div>
      <div className="d-flex align-items-center mb-2">
        <div className="mt-3 flex-1">
          <p className="m-0">
            <label htmlFor="duration" className="form-label">
              Duration :
            </label>
             ̰
          </p>
          <input
            type="range"
            className="form_range"
            min={5}
            max={60}
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            style={{
              accentColor: "black",
              width: "100%",
            }}
          ></input>
        </div>
        <div className="border border-dark px-2 py-1 mt-5 ms-2 rounded">
          {duration} MIN
        </div>
      </div>
      <FileUpload file={excelFile} handleFileChange={handleFileChange} />
      <div className="text-center">
        <button className="btn btn-dark mt-3" type="submit">
          UPLOAD
        </button>
      </div>
    </form>
  );
};

export default CreateQuizForm;
