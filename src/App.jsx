import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateQuiz from "./pages/admin/CreateQuiz";
import Layout from "./layout/Layout";
import { Toaster } from "react-hot-toast";

export const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" index element={<CreateQuiz />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
