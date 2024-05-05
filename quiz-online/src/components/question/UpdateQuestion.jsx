import React, { useEffect, useState } from 'react';
import {getQuestionById, updateQuestion} from '/Users/mathe/Trabalhos/Java/quiz-online/quiz-online/src/utils/QuizService'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateQuestion = () => {

    const {id} = useParams()
    const navigate = useNavigate()
    const [question, setQuestion] = useState("")
    const [choices, setChoices] = useState([""])
    const [correctAnswer, setCorrectAnswer] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect (() => {
        fetchQuestion()
    }, [])

    const fetchQuestion = async () => {
        try{
            const questionToUpdate = await getQuestionById(id)
            if(questionToUpdate) {
                setQuestion(questionToUpdate.question)
                setChoices(questionToUpdate.choices)
                setCorrectAnswer(questionToUpdate.correctAnswer)
            }
            setIsLoading(false)
        }catch(error){
            console.error(error);
        }
    }

    const handleQuestionChange = async (e) => {
        setQuestion(e.target.value)
    }

    const handleChoiceChange = async (index, e) => {
        const UpdatedChoices = [...choices]
        UpdatedChoices[index] = e.target.value
        setChoices(UpdatedChoices)
    }

    const handleCorrectAnswerChange = async (e) => {
        setCorrectAnswer(e.target.value)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try{
            const updatedQuestion = {
                question,
                choices,
                correctAnswer: correctAnswer
                .toString()
                .split(",")
                .map((answer) => answer.trim())
            }
            await updateQuestion(id, updatedQuestion)
            navigate("all-quizzies")
        }catch(error){
            console.error(error);
        }
    }
    if(isLoading){
        return <p>Loading...</p>
    }

    return ( 
    <div></div> 
    );
}
 
export default UpdateQuestion;