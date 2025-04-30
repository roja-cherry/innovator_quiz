import React, { useState } from "react";
import FileUpload from "./file-upload/FileUpload";
import { createQuiz } from "../api/apiService";

const CreateQuizForm = () => {
  const [excelFile, setExcelFile] = useState({});
  const [quizName, setQuizName] = useState("");
  const [duration, setDuration] = useState(5);

  const handleFileChange = (e) => {
    const file = e.target?.files[0];

    if (file?.size > 10000) {
      alert("Max allowed size is 10MB");
      return;
    }
    setExcelFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(excelFile);

    const formData = new FormData();
    formData.set("file", excelFile);
    formData.set("quizName", quizName);
    formData.set("duration", duration);

    try {
      const res = await createQuiz(formData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="quiz-form">
       <div>
        <label for="QuizTitle" class="form-label">
          Quiz Title :
        </label>
        <input
          value={quizName}
          type="text"
          class="form-control"
          id="quiztitle"
          placeholder=" Enter Quiz Title"
          onChange={e => setQuizName(e.target?.value)}
        />
      </div>
      <div className="d-flex align-items-center mb-2">
        <div className="mt-3 flex-1">
          <p className="m-0">
            <label for="duration" class="form-label">
              Duration :
            </label> ̰
          </p>
          <input
            type="range"
            class="form_range"
            min={5}
            max={60}
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            style={{
              accentColor: "black",
              width: "100%"
            }}
          ></input>
        </div>
        <div className="border border-dark px-2 py-1 mt-5 ms-2 rounded">
          {duration} MIN
        </div>
      </div>
      <FileUpload handleFileChange={handleFileChange} />
      <div className="text-center">
        <button class="btn btn-dark mt-3" type="submit">
          UPLOAD
        </button>
      </div>
    </form>
  );
};

export default CreateQuizForm;
