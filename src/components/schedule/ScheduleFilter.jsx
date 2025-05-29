import { useState } from "react";
import DatePicker from "react-datepicker";

export const ScheduleFilter = ({
  filters = {},
  handleFilterChange = () => {},
  applyFilter = () => {},
}) => {

  return (
    <div className="row mt-3 filters bg-light p-2">
      <div className="col-md-3">
        <label htmlFor="status" className="form-label">
          Status
        </label>
        <select
          id="status"
          name="status"
          className="form-select"
          value={filters?.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
        >
          <option value={-1}>Select Status</option>
          <option value="PUBLISHED">Published</option>
          <option value="ACTIVE">Active</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
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
