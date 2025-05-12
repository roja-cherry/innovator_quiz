export const APP_URLS = {
  publish: {
    text: "Schedule",
    url: "/admin/schedule"
  }
}


export const formatToDateTimeString = (dateTime) => {
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
}

