import React, { useMemo, useState } from "react";
import { createSchedule, searchQuiz } from "../../../api/apiService";
import AsyncSelect from "react-select/async";
import DatePicker from "react-datepicker";
import { APP_URLS } from "../../../utilities";
import toast from "react-hot-toast";

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

  const now = new Date().toISOString().slice(0, 16);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await createSchedule({
        startDateTime,
        endDateTime,
        quizId: selectedOption,
      });
      console.log(response);
    } catch (error) {
      toast.error(error?.message ?? "Error in creating quiz");
    }
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
      <h2>Schedule Quiz</h2>
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
              onChange={(e) => setSelectedOption(e?.value)}
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
              value={startDateTime}
              min={now}
              onChange={(e) => {
                setStartDateTime(e.target.value);
                if (endDateTime && e.target.value > endDateTime) {
                  setEndDateTime(""); // clear end time if it's invalid now
                }
              }}
            />
          </div>

          <div className="mt-3">
            <label htmlFor="endDateTime" className="form-label">
              End Date & Time
            </label>
            <input
              type="datetime-local"
              className="form-control"
              name="endDateTime"
              value={endDateTime}
              min={startDateTime || now}
              onChange={(e) => setEndDateTime(e.target.value)}
              disabled={!startDateTime}
            />
          </div>

          <div className="text-center mt-5">
            <button className="btn btn-primary mt-3" type="submit">
              {APP_URLS["publish"]?.text}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
