import React, { useState } from "react";
import FileUpload from "./file-upload/FileUpload";
import { createQuiz } from "../api/apiService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { GiSmallFire } from "react-icons/gi";

const CreateQuizForm = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [quizName, setQuizName] = useState("");
  const [duration, setDuration] = useState(5);
  const [errors,setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length>50){
      setErrors({quizName:"Quiz Title can't exceed 50 characters"});
      return
    }
    else{
      setErrors({})
    }

    setQuizName(inputValue);
  }

  const handleFileChange = (e) => {
    const file = e.target?.files[0];

    if (file?.size > 10000) {
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

    if (!excelFile) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please upload file",
      });
      return;
    }

    const formData = new FormData();
    formData.set("file", excelFile);
    formData.set("quizName", quizName);
    formData.set("duration", duration);

    try {
      await createQuiz(formData);
      const confirm = await Swal.fire({
        title: "Quiz uploaded successfully",
        icon: "success",
        draggable: true,
      });
      setQuizName("");
      setDuration(5);
      setExcelFile(null);

      if(confirm.isDismissed || confirm.isConfirmed)
        navigate("/admin/quiz-management");
    } catch (err) {
      // console.log(err);
      const errorMessage = err.response?.data?.message;

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
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
          onChange={handleInputChange}
          autoComplete="off"
          maxLength={51}
        />
        {errors?.quizName && <small style={{color:"red"}}>{errors.quizName}</small>}
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
          ></input>
        </div>
        <div className="border border-dark px-2 py-1 mt-5 ms-2 rounded">
          {duration} MIN
        </div>
      </div>
      <FileUpload
        file={excelFile}
        label="Upload File"
        handleFileChange={handleFileChange}
      />
      <div className="text-center">
        <button className="btn btn-primary mt-3" type="submit">
          UPLOAD
        </button>
      </div>
    </form>
  );
};

export default CreateQuizForm;
