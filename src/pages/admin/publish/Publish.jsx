import React, { useState } from "react";
import Select from "react-select";
import { searchQuiz } from "../../../api/apiService";
import AsyncSelect from "react-select/async";
import DatePicker from "react-datepicker";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export const Publish = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [startDateTime, setStartDateTime] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault;
  };

  const handleSearch = async (search, callBack) => {
    try {
      const response = await searchQuiz(search);
      const options = response.data?.map((quiz) => ({
        label: quiz.quizName,
        value: quiz.quizId,
      }));
      callBack(options);
    } catch (error) {}
  };

  return (
    <section className="container-fluid p-5 publish-page">
      <h2>Publish Quiz</h2>
      <div className="quiz-form-container p-5 mt-4">
        <form onSubmit={handleSubmit} className="quiz-form">
          <div>
            <label htmlFor="quiz-title" className="form-label">
              Select Quiz
            </label>
            <AsyncSelect
              name="quiz-title"
              defaultValue={selectedOption}
              placeholder="Search quiz..."
              className="form-control"
              onChange={(e) => console.log(e)}
              loadOptions={handleSearch}
            />
          </div>

          <div>
            <div className="mt-3">
              <label htmlFor="" className="form-label">
                Start Date & Time
              </label>
            </div>
            <DatePicker
              name="start-date-time"
              selected={startDateTime}
              onChange={(date) => console.log(date)}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="form-control w-100"
              showTimeSelect
            />
          </div>
        </form>
      </div>
    </section>
  );
  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>PUBLISH QUIZ</h1>

      <form>
        <label>Select Quiz</label>
        <br />
        <select>
          <option value="">Choose a quiz...</option>
          <option value="math">Math Quiz</option>
          <option value="science">Science Quiz</option>
        </select>
        <br />
        <br />
        <label> Start Date & Time</label>
        <br />
        <input type="datetime-local" />
        <br />
        <br></br>
        <label>End Date & Time</label>
        <br />
        <input type="datetime-local" />
        <br />
        <br></br>
        <button type="submit">Publish</button>
      </form>
    </div>
  );
};
