import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateQuiz from "./pages/admin/CreateQuiz";
import EditQuiz from "./pages/admin/EditQuiz";
import { Toaster } from "react-hot-toast";
import QuizManagement from "./pages/admin/quiz-management/QuizManagement";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import { Publish } from "./pages/admin/publish/Publish";
import { ViewQuiz } from "./pages/admin/ViewQuiz";
import { QUIZ_ATTEND_URL } from "./utilities";
import { EditPublish } from "./pages/admin/publish/EditPublish";
import { AttendQuiz } from "./pages/user/AttendQuiz";
import { AdminLayout } from "./layout/AdminLayout";
import { UserLayout } from "./layout/UserLayout";

export const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        {/* admin routes here... */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="admin/quiz-management" element={<QuizManagement />} />
          <Route
            path="/admin/quiz-management/create-quiz"
            element={<CreateQuiz />}
          />
          <Route
            path="/admin/quiz-management/edit/:id"
            element={<EditQuiz />}
          />
          <Route path="/admin/schedule" element={<Publish />} />
          <Route
            path="/admin/schedule/:id/re-schedule"
            element={<EditPublish />}
          />
          <Route
            path="/admin/quiz-management/quiz/:id"
            element={<ViewQuiz />}
          />
        </Route>

        {/* user routes here... */}
        <Route element={<UserLayout />}>
          <Route  path={"/user/attend-quiz"} element={<AttendQuiz />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
