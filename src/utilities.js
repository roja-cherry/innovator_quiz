import toast from "react-hot-toast";

export const QUIZ_LOGIN_URL = "/quiz/:id/login";
export const QUIZ_ATTEND_URL = "/quiz/:id/attend";

export const USER_ROLES = {
  ADMIN: "ADMIN",
  PARTICIPANT: "PARTICIPANT",
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

export const STATUS_CLASSNAME = {
  CREATED: "status-badge created",
  COMPLETED: "status-badge completed",
  PUBLISHED: "status-badge scheduled",
  CANCELLED: "status-badge cancelled",
  ACTIVE: "status-badge live",
};

export const copyScheduleAttendUrl = async (scheduleId) => {
  const baseUrl = window.location.origin;
  const path = `/start/${scheduleId}`

  try {
    await navigator.clipboard.writeText(`${baseUrl}${path}`);
    toast.success("Quiz url copied");
  } catch (error) {
    toast.error("Failed to copy quiz url");
  }
};

export const goFullScreen = async (elem = document.documentElement) => {
  try {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  } catch (error) {
    console.log(error);
  }
};