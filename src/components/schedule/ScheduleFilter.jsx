import { useState } from "react";
import DatePicker from "react-datepicker";
import { formatToLocalDateTime } from "../../utilities";

export const ScheduleFilter = ({
  filters = {},
  handleFilterChange = () => {},
  applyFilter = () => {},
}) => {
  const [dateRange, setDateRange] = useState([
    filters?.startDate ?? null,
    filters?.endDate ?? null,
  ]);
  const [startDate, endDate] = dateRange;

  return (
    <div className="row mt-3 filters bg-light p-2">
      <p>filters: {JSON.stringify(filters?.startDate)}</p>
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
          <option value="SCHEDULED">Scheduled</option>
          <option value="LIVE">Live</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <div className="col-md-3">
        <label htmlFor="startDate" className="form-label">
          Start Date
        </label>
        <input
          type="date"
          name="startDate"
          className="form-control"
          value={filters?.startDate}
          onChange={(e) => handleFilterChange("startDate", formatToLocalDateTime(e?.target?.value))}
        />
      </div>

      <div className="col-md-3">
        <label htmlFor="endDate" className="form-label">
          End Date
        </label>
        <input
          type="date"
          name="endDate"
          className="form-control"
          value={filters?.endDate}
          onChange={(e) => handleFilterChange("endDate", formatToLocalDateTime(e?.target?.value))}
        />
      </div>

      <div className="col-12 mt-4">
        <button className="btn btn-primary ms-auto" onClick={applyFilter}>
          Apply Filters
        </button>
      </div>
    </div>
  );
};
