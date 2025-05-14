import { useState } from "react";
import DatePicker from "react-datepicker";

export const ScheduleFilter = ({
  filters = {},
  handleFilterChange = () => {},
  applyFilter = () => {},
}) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

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
          <option value="SCHEDULED">Scheduled</option>
          <option value="LIVE">Live</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <div className="col-md-3">
        <label htmlFor="date-range" className="form-label">
          Created Within
        </label>
        <div className="form-control">
          <DatePicker
            selectsRange={true}
            dateFormat="yyyy-MM-dd'T'HH:mm:ss"
            timeFormat="HH:mm"
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              handleFilterChange("startDate", update[0]?.toISOString() ?? null);
              handleFilterChange("endDate", update[1]?.toISOString() ?? null);
              setDateRange(update);
            }}
            // withPortal
          />
        </div>
      </div>

      <div className="col-12 mt-4">
        <button className="btn btn-primary ms-auto" onClick={applyFilter}>
          Apply Filters
        </button>
      </div>
    </div>
  );
};
