import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import Quiz from '../../quiz-online/src/components/quiz/Quiz'
import QuizResult from '../../quiz-online/src/components/quiz/QuizResult'
import QuizStepper from '../../quiz-online/src/components/quiz/QuizStepper'
import GetAllQuiz from './components/quiz/GetAllQuiz'
import UpdateQuestion from './components/question/UpdateQuestion'
import AddQuestion from './components/question/AddQuestion'
import Navbar from './components/layout/newBar'
import Home from './components/Home'
import Admin from './components/Admin'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


function App() {
  return (
    <main className='container mt-5 mb-5'>
      <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/quiz-stepper' element={<QuizStepper />} />
            <Route path='/take-quiz' element={<Quiz />} />
            <Route path='/admin' element={<Admin />}/>

            <Route path='/create-quiz' element={<AddQuestion />}/>
            <Route path='/update-quiz/:id' element={<UpdateQuestion />} />
            <Route path='/all-quizzes' element={<GetAllQuiz />} />
            <Route path='/quiz-result' element={<QuizResult />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App
