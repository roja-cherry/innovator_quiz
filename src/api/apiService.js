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
