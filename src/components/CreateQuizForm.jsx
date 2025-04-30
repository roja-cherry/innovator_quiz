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
    formData.set("title", "Sample Title");
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
      <div >
      <label for="QuizTitle" class="form-label">Quiz Title : </label>
      <input type="text" class="form-control" id="quiztitle" placeholder=" Enter Quiz Title"/>
      <label for="duration" class="form-label">Duration</label>
      <input type="range" class="form-range" id="duration"></input>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateQuizForm;
