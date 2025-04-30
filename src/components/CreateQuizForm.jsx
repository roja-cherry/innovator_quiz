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
        <label> Quiz Title :</label>
        <input
          type="text"
          placeholder="Enter the Quiz Title"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
      </div>
      <div>
        <label> Duration :</label>
        <input
          type="range"
          value={duration}
          min={5}
          max={60}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateQuizForm;
