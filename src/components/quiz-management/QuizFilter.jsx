import React from "react";
import DatePicker from "react-datepicker";

const QuizFilter = ({ filters, handleFilterChange }) => {
  return (
    <div className="row mt-3 filters bg-light">
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
        </select>
      </div>
      {/* <div className="col-md-4">
        <select className="form-select" aria-label="Default select example">
          <option selected>Duration</option>
          <option value="10">Below 10 mins</option>
          <option value="20">Below 20 mins</option>
          <option value="30">Below 30 mins</option>
          <option value="40">Below 40 mins</option>
          <option value="50">Below 50 mins</option>
          <option value="60">Below 60 mins</option>
        </select>
      </div> */}
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
