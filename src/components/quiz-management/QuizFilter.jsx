import React from "react";
import DatePicker from "react-datepicker";

const QuizFilter = ({ filters, handleFilterChange }) => {
  return (
    <div className="row mt-3 filters bg-light p-2">
      <div className="col-md-4">
        <label htmlFor="status" className="form-label">
          Status
        </label>
        <select
          className="form-select"
          aria-label="select status filter"
          name="status"
          onChange={(e) => {
            handleFilterChange("status", e.target?.value);
          }}
        >
          <option
            selected={
              filters["status"] === null || filters["status"] === undefined
            }
          >
            Select Status
          </option>
          <option
            value="PUBLISHED"
            selected={filters["status"] === "PUBLISHED"}
          >
            Published
          </option>
          <option value="CREATED" selected={filters["status"] === "CREATED"}>
            Created
          </option>
          <option value="COMPLETED" selected={filters["status"] === "COMPLETED"}>
            Completed
          </option>
        </select>
      </div>
      <div className="col-md-4">
        <label htmlFor="date" className="form-label">
          Date
        </label>
        <select
          className="form-select"
          name="date"
          aria-label="Default select example"
          onChange={(e) => {
            handleFilterChange("date", e.target?.value);
          }}
        >
          <option selected>Duration</option>
          <option value="1">Last 1 month</option>
          <option value="3">Last 3 month</option>
          <option value="6">Last 6 month</option>
        </select>
      </div>
      {/* <div className="col-md-4">
        <div className="form-control">
          <DatePicker
            selected={createdBefore}
            onChange={(date) => console.log(date)}
          />
        </div>
      </div> */}
    </div>
  );
};

export default QuizFilter;
