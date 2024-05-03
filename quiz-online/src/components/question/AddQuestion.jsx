import React, { useEffect } from 'react'
import { useState } from 'react'

const AddQuestion = () => {
    const [question, setQuestionText] = useState("")
    const [questionType, setQuestionType] = useState("single")
    const [choices, setChoices] = useState([""])
    const [correctAnswers, setCorrectAnswers] = useState([""])
    const [subject, setSubject] = useState("")
    const [newSubject, setNewSubject] = useState("")
    const [subjectOptions, setSubjectOptions] = useState([""])

    useEffect(() => {
      fetchSubjects()
    }, [])

    const fetchSubjects = async () => {
      try{
        const subjectData = await getSubjects()
        setSubjectOptions(subjectData)
      }catch(error){
        console.error(error);
      }
    }

    const handleAddChoice = () =>{
      const lastChoice = choices[choices.length - 1]
      const lastChoiceLetter = lastChoice ? lastChoice.charAt(0) : "A"
      const newChoiceLetter = String.fromCharCode(lastChoiceLetter.charCodeAt(0) + 1)
      const newChoice = `${newChoiceLetter}`
      setChoices([...choices, newChoice])
    }

    const handleRemoveChoice = (index) => {
      setChoices(choices.filter((choices, i) => i ==! index))
    }

    const handleChoiceChange = (index, value) => {
      setChoices(choices.map((choice, i) => (i === index ? value : choice)))
    }

    const handleCorrectAnswerChoice = (index, value) => {
      setCorrectAnswers(correctAnswers.map((answer, i) => (i === index ? value : answer)))
    }

    const handleAddCorrectAnswer = () => {
      setCorrectAnswers([...correctAnswers, ""])
    }

    const handleRemoveCorrectAnswer = (index) => {
      setCorrectAnswers(correctAnswers.filter((answer, i) => i !== index))
    }

    const handleSubmit = async (e) => {

      e.preventDefault()

      try{
        const result = {
          question,
          questionType,
          choices,
          correctAnswers: correctAnswers.map((answer) => {
            const choiceLetter = answer.charAt(0).toUpperCase()
            const choiceIndex = choiceLetter.charCodeAt(0) - 65
            return choiceIndex >= 0 && choiceIndex < choices.length ? choiceLetter : null
          }),

          subject

        }

        await createQuestion(result)

        setQuestionText("")
        setQuestionType("single")
        setChoices([""])
        setCorrectAnswers([""])
        setSubject("")

      }catch(error){
        console.error(error);
      }
    }

    const handleAddSubject = () => {
      if(newSubject.trim() !== "") {
        setSubject(newSubject.trim())
        setSubjectOptions([...subjectOptions, newSubject.trim()])
        setNewSubject("")
      }
    }

  return (
    <div className='container'>
      <div className='row justify-content center'>
        <div className='col-md-6 mt-5'>
          <div className='card'>
            <div className='card-header'>
              <h5 className='card-title'>Add New Question</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddQuestion