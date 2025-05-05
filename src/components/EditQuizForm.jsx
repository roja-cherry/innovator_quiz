import React, { useState } from "react";
import FileUpload from "./file-upload/FileUpload";

const EditQuizForm = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [quizName, setQuizName] = useState("");
  const [duration, setDuration] = useState(5);

  const handleFileChange = (e) => {
    const file = e.target?.files[0];

    if (file?.size > 10000) {
      alert("Maximum allowed size is 10MB");
      return;
    }

    setExcelFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Quiz updated (static)");
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
          />
        </div>
        <div className="border border-dark px-2 py-1 mt-5 ms-2 rounded">
          {duration} MIN
        </div>
      </div>
      <FileUpload file={excelFile} handleFileChange={handleFileChange} />
      <div className="text-center">
        <button className="btn btn-dark mt-3" type="submit">
          UPDATE
        </button>
      </div>
    </form>
  );
};

export default EditQuizForm;
