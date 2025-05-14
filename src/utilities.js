import { format } from "date-fns";

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

export const formatToLocalDateTime = date => {
  return format(date, "yyyy-MM-dd'T'HH:mm");
} 

export const formatStatus = (status) => {
  const formattedStatus = {
    COMPLETED: "Completed",
    PUBLISHED: "Published",
    CREATED: "Created",
  };

  return formattedStatus[status];
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
