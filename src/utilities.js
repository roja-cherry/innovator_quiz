import toast from "react-hot-toast";

export const QUIZ_ATTEND_URL = "/quiz/:id/attend"

export const APP_URLS = {
  publish: {
    text: "Schedule",
    url: "/admin/schedule",
  },
};

export const formatToDateTimeString = (dateTime) => {
  if (!dateTime) {
    return "-";
  }
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  let date = new Date(dateTime);
  return date.toLocaleString("en-US", options);
};

export const getStatusClassName = (status) => {
  const statusClassName = {
    COMPLETED: "badge text-bg-success",
    PUBLISHED: "badge text-bg-warning",
    CREATED: "badge bg-badge-blue text-bg-dark-",
  };
  return statusClassName[status];
};

export const STATUS_CLASSNAME = {
  COMPLETED: "status-badge completed",
  SCHEDULED: "status-badge scheduled",
  CANCELLED: "status-badge cancelled",
  LIVE: "status-badge live",
  true: "status-badge is-scheduled",
  false: "status-badge unscheduled",
};

export const copyScheduleAttendUrl = async (scheduleId) => {
  const baseUrl = window.location.origin
  const path = QUIZ_ATTEND_URL.replace(":id", scheduleId)

  try {
    await navigator.clipboard.writeText(`${baseUrl}${path}`);
    toast.success("Quiz url copied")
  } catch (error) {
    toast.error("Failed to copy quiz url")
  }

}