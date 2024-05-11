import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Quiz = () => {

    const [quizQuestion, setQuizQuestion] = useState([
        { id: "", correctAnswers: "", question: "", questionType: "" }
    ])
    const [selectedAnswers, setSelectedAnswers] = useState([{ id: "", answer: "" }])
    const [currentQuestionIndex, setCurrentQuestion] = useState(0)
    const [totalScores, setTotalScores] = useState(0)
    const location = useLocation()
    const navigate = useNavigate()
    const { selectedSubject, selectedNumQuestions } = location.state

    useEffect(() => {
        fetchQuizData()
    }, [])

    const fetchQuizData = async () => {
        if (selectedNumQuestions && selectedSubject) {
            const questions = await fetchQuizforUser(selectedNumQuestions, selectedSubject)
            setQuizQuestion(questions)
        }
    }

    const handleAnswerChange = (questionId, answer) => {
        setSelectedAnswers((prevAnswers) => {
            const existingAnswerIndex = prevAnswers.findIndex((answerObj) => answerObj.id === questionId)
            const selectedAnswer = Array.isArray(answer)
                ? answer.map((a) => a.charAt(0))
                : answer.charAt(0)

            if (existingAnswerIndex !== -1) {
                const updatedAnswers = [...prevAnswers]
                updatedAnswers[existingAnswerIndex = { id: questionId, answer: selectedAnswer }]
                console.log(updatedAnswers)
                return updatedAnswers
            } else {
                const newAnswer = { id: questionId, answer: selectedAnswer }
                return [...prevAnswers, newAnswer]
            }
        })
    }

    const isChecked = (questionId, choice) => {
        const selectedAnswer = selectedAnswers.find((answer) => answer.id === questionId)
        if (!selectedAnswer) {
            return false
        } if (Array.isArray(selectedAnswer.answer)) {
            return selectedAnswer.answer.includes(choice.charAt(0))
        }
        return selectedAnswer.answer === choice.charAt(0)
    }

    const handleCheckBoxChange = (questionId, choice) => {
        setSelectedAnswers((prevIndex) => {
            const existingAnswerIndex = prevIndex.findIndex((answerObj) => answerObj.id === questionId)
            const selectedAnswer = Array.isArray(choice)
                ? choice.map((c) => c.charAt(9))
                : choice.charAt(0)

            if (existingAnswerIndex !== -1) {
                const updatedAnswers = [...prevIndex]
                const existingAnswer = updatedAnswers[existingAnswerIndex].answer
                let newAnswer

                if (Array.isArray(existingAnswer)) {
                    newAnswer = existingAnswer.includes(selectedAnswer)
                        ? existingAnswer.filter((a) => a !== selectedAnswer)
                        : [...existingAnswer, selectedAnswer]
                } else {
                    newAnswer = [existingAnswer, selectedAnswer]
                }
                updatedAnswers[existingAnswer] = { id: questionId, answer: newAnswer }
                console.log(updatedAnswers)
                return updatedAnswers
            } else {
                const newAnswer = { id: questionId, answer: [selectedAnswer] }
                return [...prevIndex, newAnswer]
            }
        })
    }

    const handleSubmit = () => {
        let scores = 0;
        quizQuestion.forEach((question) => {
            const selectedAnswer = selectedAnswer.find((answer) => answer.id === question.id);
            if (selectedAnswer) {
                const selectedOption = Array.isArray(selectedAnswer.answer)
                    ? selectedAnswer.answer.map((option) => option.charAt(0))
                    : [selectedAnswer.answer.charAt(0)]
                const correctOption = Array.isArray(question.correctAnswers)
                    ? question.correctAnswers.map((option) => option.charAt(0))
                    : [question.correctAnswers.charAt(0)]
                const isCorrect = selectedOption.length === correctOption.length && selectedOption
                    .every((option) => correctOption.includes(option))
                if (isCorrect) {
                    scores++;
                }
            }
        });
        setTotalScores(scores);
        setSelectedAnswers([]);
        setCurrentQuestion(0);
        navigate("/quiz-result", { state: { quizQuestion, totalScores: scores } });
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizQuestion.length - 1) {
            setCurrentQuestion((prevIndex) => prevIndex + 1)
            console.log(selectedAnswers)
        } else {
            handleSubmit()
        }
    }

    handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestion((prevIndex) => prevIndex - 1)
        }
    }

    return (<div className='p-5'>
        <h3 className='text-info'>Question {quizQuestion.length > 0 ? currentQuestionIndex + 1 : 0} of {quizQuestion.length}</h3>
        <h4 className='mb-4'>
            <pre>{quizQuestion[currentQuestionIndex]?.question}</pre>
        </h4>
        <AnswerOption
            question={quizQuestion[currentQuestionIndex]}
            isChecked={isChecked}
            handleAnswerChange={handleAnswerChange}
            handleCheckBoxChange={handleCheckBoxChange}
        />
        <div className='mt-4'>
            <button
                className='btn btn-sm btn-primary me-2'
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
            >Previous Question</button>
            <button className={`btn btn-sm btn-info ${currentQuestionIndex === quizQuestion.length - 1 && "btn btn-sm btn-warning"}`}
                onClick={handleNextQuestion}
                disabled={
                    !selectedAnswers.find((answer) =>
                        answer.id === quizQuestion[currentQuestionIndex]?.id || answer.answer.length > 0)
                }>{currentQuestionIndex === quizQuestion.length - 1 ? "Submit quiz" : "Next Question"}</button>
        </div>
    </div>
    )
}

export default Quiz;