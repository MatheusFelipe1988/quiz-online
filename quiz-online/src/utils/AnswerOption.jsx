import React from 'react';

const AnswerOption = ({ question, isCheked, handleAnswerChange, handleCheckboxChange }) => {

    if (!question) {
        return (
            <div>No Questions Avaliable, <br /> you may try again by reducing your requested number of questions
                on this topic</div>
        )
    }

    const { id, questionType, choices } = question

    if (questionType === "single") {
        return (
            <div>{choices.sort().map((choice, index) => (
                <div key={choice} className='form-check mb-3'>
                    <input className='form-check input'
                        type='radio'
                        id={choice}
                        name={question.id}
                        value={choice}
                        checked={isCheked(question.id, choice)}
                        onChange={() => handleAnswerChange(id, choice)} />
                    <label htmlFor={choice} className='form-check-label ms-2'>{choice}</label>
                </div>
            ))}
            </div>
        )
    } else if (questionType === "multiple") {
        return (
            <div>
                {choices.sort().map((choice, index) => (
                    <div key={choice} className='form-check mb-3'>
                        <input
                            className='form-check-input'
                            type='checkboc'
                            id={choice}
                            name={question.id}
                            value={choice}
                            checked={isCheked(question.id, choice)}
                            onChange={() => handleCheckboxChange(id, choice)}
                        />
                        <label htmlFor={choice} className='form-check-label ms-2'>{choice}</label>
                    </div>
                ))}
            </div>
        )
    }
}

export default AnswerOption;