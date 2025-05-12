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

export const deleteQuiz = (quizId) => {
  return axiosInstance.delete(`/api/admin/quiz/${quizId}`);
}

export const getQuizWithQuestions = async (id) => {
  return await axiosInstance.get(`/api/admin/quiz/quiz-with-questions/${id}`);
};


export const createSchedule = async (data) => {
  return await axiosInstance.post("/api/schedule", data)
}