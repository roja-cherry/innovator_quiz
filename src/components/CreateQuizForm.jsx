import React, { useState } from "react";
import FileUpload from "./file-upload/FileUpload";

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FileUpload handleFileChange={handleFileChange} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateQuizForm;
