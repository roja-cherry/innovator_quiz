import React, { useState, useEffect, useMemo } from "react";
import "./dashboard.scss";
import { cancelById, getAllSchedules } from "../../../api/apiService";
import {
  copyScheduleAttendUrl,
  formatToDateTimeString,
  STATUS_CLASSNAME,
} from "../../../utilities";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CiFilter } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { ScheduleFilter } from "../../../components/schedule/ScheduleFilter";
import { MdContentCopy, MdEditCalendar, MdOutlineRepeat } from "react-icons/md";
import { FaRegCircleStop } from "react-icons/fa6";
import { useAppContext } from "../../../context/AppContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { setTitle } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [schedules, setSchedules] = useState([]);
  const [showFilter, setShowFilter] = useState(searchParams?.size > 0);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({status: "ACTIVE"});

  useEffect(() => {
    setTitle("Dashboard")
    const params = Object.fromEntries(searchParams.entries());
    const updatedFilters = { ...filters, ...params };
    setFilters(updatedFilters);
    fetchAllSchedules(updatedFilters);

    return () => setTitle("")
  }, []);

  const fetchAllSchedules = async (params = filters) => {
    try {
      const response = await getAllSchedules(params);
      setSchedules(response.data?.reverse());
    } catch (error) {
      console.error("Failed to fetch scheduled quizzes:", error);
      toast.error("Failed to load scheduled quizzes");
    }
  };

  const handleCancel = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Cancel",
        cancelButtonText: "No",
        customClass: {
          confirmButton: "btn btn-danger bg-danger",
          cancelButton: "btn btn-outline-primary",
        },
      });

      if (confirm.isDenied || confirm.isDismissed) {
        return;
      }
      await cancelById(id);
      toast.success("Schedule cancelled successfully");
      fetchAllSchedules();
    } catch (error) {
      console.error("Cancel failed:", error);
      toast.error("Failed to cancel schedule");
    }
  };

  const handleReschedule = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Re-Schedule",
        cancelButtonText: "Cancel",
        customClass: {
          confirmButton: "btn btn-danger bg-danger",
          cancelButton: "btn btn-outline-primary",
        },
      });

      if (confirm.isDenied || confirm.isDismissed) {
        return;
      }
      navigate(`/admin/schedule/${id}/re-schedule`);
    } catch (error) {
      toast.error("Failed to navigate to re-schedule page");
    }
  };

  const data = useMemo(() => {
    if (!search) return schedules;

    const searchResult = schedules.filter((sch) => {
      if (
        sch?.quizTitle
          ?.toLowerCase()
          ?.includes(search?.toLowerCase()?.trim()) ||
        sch?.status?.toLowerCase()?.includes(search?.toLowerCase()?.trim())
      ) {
        return sch;
      }
    });
    return searchResult;
  }, [schedules, search]);

  const handleFilterChange = (key, val) => {
    if (val === "" || val == -1 || val == null) {
      searchParams.delete(key);
      const { [key]: _, ...rest } = filters;
      setFilters(rest);
    } else {
      // For isScheduled, we want a boolean not a string
      const actualValue = key === "isScheduled" ? val === "true" : val;

      searchParams.set(key, actualValue);
      setFilters((prev) => ({
        ...prev,
        [key]: actualValue,
      }));
    }
    setSearchParams(searchParams);
  };

  const applyFilter = async () => {
    fetchAllSchedules();
  };

  return (
    <section className="quiz-management-container">
      <div className="d-flex justify-content-between mt-4">
        <div className="d-flex align-items-center">
          <div className="position-relative">
            <input
              type="text"
              className="form-control ps-5"
              id="search"
              placeholder="search"
              value={search}
              autoComplete="off"
              onChange={(e) => setSearch(e.target?.value)}
            />
            <IoSearchOutline className="search-icon" />
          </div>
          <button
            className={`btn border ms-2 ${showFilter && "btn-primary"}`}
            onClick={() => setShowFilter((prev) => !prev)}
          >
            <CiFilter className="me-2" style={{ fontSize: "1.5rem" }} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {showFilter && (
        <ScheduleFilter
          filters={filters}
          handleFilterChange={handleFilterChange}
          applyFilter={applyFilter}
        />
      )}

      <div className="mt-4 quiz-management-container table-responsive">
        <table className="quiz-table_ table table-hover">
          <thead>
            <tr>
              <th className="bg-light">Quiz Title</th>
              <th className="bg-light">Start Time</th>
              <th className="bg-light">End Time</th>
              <th className="bg-light">Status</th>
              <th className="action bg-light text-en">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((schedule) => (
              <tr key={schedule.id}>
                <td>
                  <Link
                    to={`/admin/quiz-management/quiz/${schedule.quizId}`}
                    className="quiz-name"
                  >
                    {schedule.quizTitle}
                  </Link>
                </td>
                <td>{formatToDateTimeString(schedule.startDateTime)}</td>
                <td>{formatToDateTimeString(schedule.endDateTime)}</td>
                <td>
                  <span className={STATUS_CLASSNAME[schedule?.status]}>
                    {schedule.statusText}
                  </span>
                </td>
                <td>
                  <div className="tooltip-container">
                    <MdContentCopy
                      className={`action-btn text-success 
                        ${["CANCELLED","COMPLETED"].includes(schedule?.status)
                          ? "btn-disabled"
                          :""
                        }
                        `}
                      // onClick={() => { if (!["CANCELLED", "COMPLETED"].includes(schedule?.status)) { copyScheduleAttendUrl(schedule?.id); }}}
                      onClick={() => { copyScheduleAttendUrl(schedule?.id); }}

                    />
                    <span className="tooltip-text">Copy Quiz URL</span>
                  </div>

                  <div className="tooltip-container">
                    <MdEditCalendar
                      className={`action-btn text-primary ms-3 ${
                        ["ACTIVE", "COMPLETED"].includes(schedule?.status)
                          ? "btn-disabled"
                          : ""
                      }`}
                      onClick={() =>
                        !["ACTIVE", "COMPLETED"].includes(schedule?.status) &&
                        handleReschedule(schedule?.id)
                      }
                    />
                    <span className="tooltip-text">Re-Schedule</span>
                  </div>

                  <div className="tooltip-container">
                    <FaRegCircleStop
                      className={`action-btn text-danger ms-3 ${
                        ["CANCELLED", "COMPLETED"]?.includes(schedule?.status)
                          ? "btn-disabled"
                          : ""
                      }`}
                      onClick={() =>
                        !["CANCELLED", "COMPLETED"]?.includes(
                          schedule?.status
                        ) && handleCancel(schedule.id)
                      }
                    />
                    <span className="tooltip-text">Cancel Schedule</span>
                  </div>
                </td>
              </tr>
            ))}

            {!data?.length && (
              <tr>
                <td colSpan="5" className="text-center">
                  No Data Found, try changing filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Dashboard;
