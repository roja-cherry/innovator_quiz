import React from "react";

const QuizFilter = ({
  filters,
  handleFilterChange = () => {},
  applyFilter = () => {},
}) => {
  return (
    <div className="row mt-3 filters bg-light p-2">
      {/* <div className="col-md-3">
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
            value={-1}
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
          <option
            value="COMPLETED"
            selected={filters["status"] === "COMPLETED"}
          >
            Completed
          </option>
        </select>
      </div> */}
      <div className="col-md-3">
        <label htmlFor="date" className="form-label">
          Created Within
        </label>
        <select
          className="form-select"
          name="date"
          aria-label="Default select example"
          onChange={(e) => {
            handleFilterChange("createdWithin", e.target?.value);
          }}
        >
          <option
            value={-1}
            selected={
              filters["createdWithin"] === null ||
              filters["createdWithin"] === undefined
            }
          >
            Select Created Within
          </option>
          <option value="1m" selected={filters["createdWithin"] === "1m"}>
            Last 1 month
          </option>
          <option value="3m" selected={filters["createdWithin"] === "3m"}>
            Last 3 month
          </option>
          <option value="6m" selected={filters["createdWithin"] === "6m"}>
            Last 6 month
          </option>
          <option
            value="before6m"
            selected={filters["createdWithin"] === "before6m"}
          >
            Before 6 months
          </option>
        </select>
      </div>
      {/* Scheduled? Filter */}
      <div className="col-md-3">
        <label htmlFor="isScheduled" className="form-label">
          Scheduled?
        </label>
        <select
          id="isScheduled"
          name="isScheduled"
          className="form-select"
          value={
            filters.isScheduled === true
              ? "true"
              : filters.isScheduled === false
              ? "false"
              : ""
          }
          onChange={(e) => handleFilterChange("isScheduled", e.target.value)}
        >
          <option value={-1}>All</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      
      <div className="col-12 mt-4">
        <button className="btn btn-primary ms-auto" onClick={applyFilter}>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default QuizFilter;
