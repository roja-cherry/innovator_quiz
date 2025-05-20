import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateQuiz from "./pages/admin/CreateQuiz";
import EditQuiz from "./pages/admin/EditQuiz";
import { Toaster } from "react-hot-toast";
import QuizManagement from "./pages/admin/quiz-management/QuizManagement";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import { Publish } from "./pages/admin/publish/Publish";
import { ViewQuiz } from "./pages/admin/ViewQuiz";
import { QUIZ_ATTEND_URL, QUIZ_LOGIN_URL } from "./utilities";
import { EditPublish } from "./pages/admin/publish/EditPublish";
import TakeQuiz from "./pages/user/TakeQuiz";
import { AdminLayout } from "./layout/AdminLayout";
import { UserLayout } from "./layout/UserLayout";
import StartQuiz from './pages/user/StartQuiz';
import { NotFoundPage } from "./pages/common/not-found/NotFound";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import { Login } from "./components/auth/Login";
import { Unauthorized } from "./components/auth/Unauthorized";
import { QuizLogin } from "./pages/user/QuizLogin";
import QuizScore from "./pages/user/QuizScore";

export const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* Admin routes - protected */}
        {/* <Route element={<PrivateRoute roles={["ADMIN"]} />}> */}
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="admin/quiz-management" element={<QuizManagement />} />
            <Route
              path="admin/quiz-management/create-quiz"
              element={<CreateQuiz />}
            />
            <Route
              path="admin/quiz-management/edit/:id"
              element={<EditQuiz />}
            />
            <Route path="admin/schedule" element={<Publish />} />
            <Route
              path="admin/schedule/:id/re-schedule"
              element={<EditPublish />}
            />
            <Route
              path="admin/quiz-management/quiz/:id"
              element={<ViewQuiz />}
            />
          </Route>
        {/* </Route> */}

        {/* User routes */}
        <Route element={<UserLayout />}>
          {/* <Route index path={QUIZ_ATTEND_URL} element={<AttendQuiz />} /> */}
          <Route path="/start/:scheduleId" element={<StartQuiz />} />
          <Route path="/quiz-score" element={<QuizScore />} />
          <Route index path={QUIZ_LOGIN_URL} element={<QuizLogin />} />
          <Route path="/attend-quiz/:scheduleId" element={<TakeQuiz />} />

        </Route>

        {/* Catch-all route */}
      </Routes>
    </BrowserRouter>
  );
};
