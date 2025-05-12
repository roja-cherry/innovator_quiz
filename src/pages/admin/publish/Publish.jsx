import React, { useState } from "react";
import { searchQuiz } from "../../../api/apiService";
import AsyncSelect from "react-select/async";
import DatePicker from "react-datepicker";

const customStyles = {
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#0d9486" // selected option
      : state.isFocused
      ? "#0d9486" // hover/focus (optional)
      : "white",
    color: state.isFocused ? "white" : "black",
  }),
  control: (base) => ({
    ...base,
    borderColor: "#dee2e6",
    boxShadow: "none",
    "&:hover": { borderColor: "#0d9486" },
    height: "calc(2.25rem + 2px)",
    fontSize: "1rem",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0 0.75rem",
  }),
  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
  }),
  indicatorsContainer: (base) => ({
    ...base,
    height: "100%",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: "0 0.5rem",
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
  }),
};

export const Publish = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);

  const calculateTermDuration = () => {
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);
    const timeDiff = end - start;
    const days = timeDiff / (1000 * 3600 * 24);
  };

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
              styles={customStyles}
            />
          </div>

          <div className="mt-3">
            <label htmlFor="startDateTime" className="form-label">
              Start Date & Time
            </label>
            <input
              type="datetime-local"
              className="form-control"
              name="startDateTime"
            />
          </div>

          <div className="text-center">
            <button className="btn btn-primary mt-3" type="submit">
              PUBLISH
            </button>
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
