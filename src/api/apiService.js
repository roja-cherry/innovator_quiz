import { axiosInstance } from "./axiosInstance";
import qs from "qs";

export const createQuiz = (formData) => {
  return axiosInstance.post("/api/quiz", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editQuiz = (formData, quizId) => {
  return axiosInstance.put(`/api/quiz/${quizId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getQuiz = (quizId) => {
  return axiosInstance.get(`/api/quiz/${quizId}`);
};

export const getQuizList = (params) => {
  return axiosInstance.get("api/quiz", { params });
};

export const searchQuiz = (keyword) => {
  return axiosInstance.get("api/quiz/search", {
    params: { keyword },
  });
};

export const statusActivate = (quizId, newStatus) => {
  return axiosInstance.patch(`api/admin/quiz/${quizId}`, {
    isActive: newStatus,
  });
};

export const deleteQuiz = (quizId) => {
  return axiosInstance.delete(`/api/quiz/${quizId}`);
};

export const getQuizWithQuestions = async (id) => {
  return await axiosInstance.get(`/api/quiz/${id}`);
};

export const createSchedule = async (data) => {
  return await axiosInstance.post("/api/schedule", data);
};

export const reScheduleQuiz = async (id, data) => {
  return await axiosInstance.patch(`/api/schedule/${id}/reschedule`, data);
};

export const getSchedule = async (id) => {
  return await axiosInstance.get(`/api/schedule/${id}`);
};

export const getScheduledQuizzes = async () => {
  return await axiosInstance.get("/api/schedule/status", {
    params: { status: "SCHEDULED" },
  });
};

export const getAllSchedules = async (params) => {
  return await axiosInstance.get("/api/schedule", {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }), // handles arrays like ?status=SCHEDULED&status=LIVE
  });
};

export const getSchedulesByQuizId = async (quizId) => {
  return await axiosInstance.get(`/api/schedule/quiz/${quizId}`);
};

export const cancelById = async (id) => {
  return await axiosInstance.patch(`/api/schedule/${id}/cancel`);
};

export const getScheduleForParticipant = async (id) => {
  return await axiosInstance.get(`/api/participant/schedule/${id}`);
};

export const loginForSchedule = async (scheduleId, data) => {
  return await axiosInstance.post(`/api/auth/login-for-quiz/${scheduleId}`, data);
};

export const submitQuiz = async (userId, scheduleId, answers) => {
  return await axiosInstance.post(`/api/participant/submit`, answers, {
    params: { userId, scheduleId },
  });
};

export const getAttempt = async (id) => {
  return await axiosInstance.get(`/api/participant/attempt/${id}`);
}
