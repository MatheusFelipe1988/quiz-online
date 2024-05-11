import React from 'react';
import { useLocation } from "react-router-dom"

const QuizResult = () => {
    const location = useLocation()
    const { quizQuestion, totalScores } = location.state
    const numQuestions = quizQuestion.length
    const percentage = Math.round((totalScores / numQuestions) * 100)

    const handleRetakeQuiz = () => {
        alert("Oops! this functionality was not implemented!!!")
    }

    return (<section>
        <h3>Your Quiz Result Summary</h3>
        <hr />
        <h5 className='text-info'>
            You answered {totalScores} of the {numQuestions} questions correctly
        </h5>

        <p>Your total score is {percentage}%</p>

        <button className='btn btn-primary btn-sm' onClick={handleRetakeQuiz}>
            Retake this Quiz
        </button>
    </section>
    )
}

export default QuizResult;