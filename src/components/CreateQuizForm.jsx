import React, { useState } from "react";
import FileUpload from "./file-upload/FileUpload";
import { createQuiz } from "../api/apiService";

const CreateQuizForm = () => {
  const [excelFile, setExcelFile] = useState({});
  const [fileName, setFileName] = useState("");
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
    formData.set("quizName", "Sample Title");
    formData.set("duration", 30);

    try {
      const res = await createQuiz(formData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FileUpload handleFileChange={handleFileChange} />
      <div>
        <label for="QuizTitle" class="form-label">
          Quiz Title :{" "}
        </label>
        <input
          type="text"
          class="form-control"
          id="quiztitle"
          placeholder=" Enter Quiz Title"
        />
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="mt-3">
          <p>
            <label for="duration" class="form-label">
              Duration :
            </label>
          </p>
          <input
            type="range"
            class="form-range"
            style={{ width: "800px" }}
            min={5}
            max={60}
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          ></input>
        </div>
        <div className="border border-dark px-2 py-1 mt-5 rounded">
          {duration} MIN
        </div>
      </div>
      <div className="text-center">
        <button class="btn btn-dark mt-3" type="submit">
          UPLOAD
        </button>
      </div>
    </form>
  );
};

export default CreateQuizForm;
