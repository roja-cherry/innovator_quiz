import { axiosInstance } from "./axiosInstance";

export const createQuiz = (formData) => {
  return axiosInstance.post("/api/admin/quiz/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
