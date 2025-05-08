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

export const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/admin/create-quiz" element={<CreateQuiz />} />
          <Route path="/admin/edit/:id" element={<EditQuiz />} />
          <Route path="/admin/quiz-management" element={<QuizManagement />} />
          <Route path="/admin/publish" element={<Publish />} />
          <Route path="/admin/quiz/:id" element={<ViewQuiz />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
