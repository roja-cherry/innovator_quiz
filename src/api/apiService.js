import { axiosInstance } from "./axiosInstance";

export const createQuiz = (formData) => {
  return axiosInstance.post("/api/admin/quiz/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editQuiz = (formData, quizId) => {
  return axiosInstance.put(`/api/admin/quiz/${quizId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getQuiz = (quizId) => {
  return axiosInstance.get(`/api/admin/quiz/${quizId}`);
};

export const getQuizList = (params) => {
  return axiosInstance.get("api/admin/quiz/quizzes", { params });
};

export const searchQuiz = (keyword) => {
  return axiosInstance.get("api/admin/quiz/search", { 
    params: { keyword },
  });
};

export const statusActivate = (quizId,newStatus) => {
  return axiosInstance.patch(`api/admin/quiz/${quizId}`, {
    isActive: newStatus
  });
};

export const deleteQuiz = (quizId) => {
  return axiosInstance.delete(`/api/admin/quiz/${quizId}`);
};

export const getQuizWithQuestions = async (id) => {
  return await axiosInstance.get(`/api/admin/quiz/quiz-with-questions/${id}`);
};


export const createSchedule = async (data) => {
  return await axiosInstance.post("/api/schedule", data)
}

export const getScheduledQuizzes = async () => {
  return await axiosInstance.get("/api/schedule", {
    params: { status: "SCHEDULED" },
  });
};

export const getAllSchedules = async () => {
  return await axiosInstance.get("/api/schedule/all-schedule");
};

export const getScheduleById = async (id) => {
  return await axiosInstance.get(`/api/schedule/${id}`);
};

