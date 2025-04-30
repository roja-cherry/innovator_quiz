import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateQuiz from './pages/admin/CreateQuiz'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CreateQuiz />} />
      </Routes>
    </BrowserRouter>
  )
}
