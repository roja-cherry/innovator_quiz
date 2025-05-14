import React, { useEffect, useState } from "react";
import { APP_URLS } from "../../utilities";
import {
  createSchedule,
  getSchedule,
  reScheduleQuiz,
  searchQuiz,
} from "../../api/apiService";
import toast from "react-hot-toast";
import AsyncSelect from "react-select/async";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

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

const ScheduleForm = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);

  const now = new Date().toISOString().slice(0, 16);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) await reSchedule();
    else await schedule();
  };

  const reSchedule = async () => {
    try {
      await reScheduleQuiz(id, {
        id: id,
        startDateTime,
        endDateTime,
        quizId: selectedOption?.value ?? selectedOption,
      });

      const confirm = await Swal.fire({
        title: "Quiz re-scheduled successfully",
        icon: "success",
        confirmButtonText: "OK",
      });

      if (confirm.isDismissed || confirm.isConfirmed)
        navigate("/admin/quiz-management");
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Error in creating quiz");
    }
  };

  const schedule = async () => {
    try {
      await createSchedule({
        startDateTime,
        endDateTime,
        quizId: selectedOption.value,
      });
      const confirm = await Swal.fire({
        title: "Quiz scheduled successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
      if (confirm.isDismissed || confirm.isConfirmed)
        navigate("/admin/quiz-management");
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Error in creating quiz");
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

  useEffect(() => {
    if (id) {
      getSchedule(id)
        .then((res) => {
          const option = {
            label: res?.data?.quizTitle,
            value: res?.data?.quizId,
          };
          setSelectedOption(option);
          console.log(option);
          console.log(selectedOption);

          setStartDateTime(res?.data?.startDateTime);
          setEndDateTime(res?.data?.endDateTime);
        })
        .catch((err) => {
          toast.error(err?.message ?? "Failed to fetch schedule details");
          navigate("/");
        });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="quiz-form">
      <div>
        <label htmlFor="quiz-title" className="form-label">
          Select Quiz
        </label>
        <AsyncSelect
          key={selectedOption}
          name="quiz-title"
          defaultValue={selectedOption}
          placeholder="Search quiz..."
          className="form-control"
          disabled={isEdit}
          onChange={(option) => setSelectedOption(option)}
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
          {isEdit ? "Re-Schedule" : "Schedule"}
        </button>
      </div>
    </form>
  );
};

export default ScheduleForm;
