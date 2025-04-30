import React, { useState } from "react";
import FileUpload from "./file-upload/FileUpload";
import { createQuiz } from "../api/apiService";

const CreateQuizForm = () => {
  const [excelFile, setExcelFile] = useState({});

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

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateQuizForm;
