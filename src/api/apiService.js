import { axiosInstance } from "./axiosInstance";

export const createQuiz = (formData) => {
  return axiosInstance.post("/quiz", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
