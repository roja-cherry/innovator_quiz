import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateQuiz from "./pages/admin/CreateQuiz";
import EditQuiz from "./pages/admin/EditQuiz";
import Layout from "./layout/Layout";
import { Toaster } from "react-hot-toast";
import QuizManagement from "./pages/admin/quiz-management/QuizManagement";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import { Publish } from "./pages/admin/publish/Publish";
import { ViewQuiz } from "./pages/admin/ViewQuiz";
import { APP_URLS, QUIZ_ATTEND_URL } from "./utilities";
import { EditPublish } from "./pages/admin/publish/EditPublish";
import { AttendQuiz } from "./pages/user/AttendQuiz";

export const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="admin/quiz-management" element={<QuizManagement />} />
          <Route path="/admin/quiz-management/create-quiz" element={<CreateQuiz />} />
          <Route path="/admin/quiz-management/edit/:id" element={<EditQuiz />} />
          <Route path={APP_URLS["publish"].url} element={<Publish />} />
          <Route path="/admin/schedule/:id/re-schedule" element={<EditPublish />} />
          <Route path="/admin/quiz-management/quiz/:id" element={<ViewQuiz />} /> 
        </Route>
        <Route path={QUIZ_ATTEND_URL} element={<AttendQuiz />} />
      </Routes>
    </BrowserRouter>
  );
};
