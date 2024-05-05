const { useState, useEffect } = require("react")
const { Link } = require("react-router-dom")

const GetAllQuiz = () => {
    const [questions, setQuestions] = useState([
        {id: "", question:"", correctAnswer: "", choices: [] }
    ])

    const [isLoading, setIsLoading] = useState(true)
    const [isDeletedQuestion, setIsDeletedQuestion] = useState(false)
    const [deleteSucess, setDeleteSucess] = useState("")

    useEffect(() => {
        fetchQuestions()
    }, [])

    const fetchQuestions = async () => {
        try{
            const data = await getAllQuestions()
            setQuestions(data)
            setIsLoading(false)
        }catch(error){
            console.error(error);
        }
    }

    const handleDeleteQuestion = async (id) => {
        try{
        await handleDeleteQuestion(id)
        setQuestion(questions.filter((question) => question.id !== id))
        setIsDeletedQuestion(true)
        setDeleteSucess("QUestion deleted sucessfully")
        }catch(error){
            console.error(error);
        }
        setTimeout(() => {
            setDeleteSucess("")
        }, 4000);
    }
    if(isLoading){
        return <p>Loading...</p>
    }

    return(
        <section className="container">
            <div className="row mt-5">
                <div className="col-md-6 mb-2 md-mb-0" style={{color: "GrayText"}}>
                    <h4>All Quiz Questions</h4>
                </div>
                <div className="col-md-4 d-flex justify-content-end">
                    <link to={"/create-quiz"}>
                        <Faplus /> Add Question
                    </link>
                </div>
            </div>
            <hr />
            {isDeletedQuestion && <div className="alert alert-sucess">{deleteSucess}</div>}
            {questions.map((question, index) => (
                <div key={question.id}>
                    <pre>
                        <h4 style={{color: "GrayText"}}>{`${index + 1}. ${question.question}`}</h4>
                    </pre>
                    <ul>
                        {question.choices.map((choice, index) => (
                            <li key={index}>{choice}</li>
                        ))}
                    </ul>
                    <p className="text-sucess">Correct Answer: {question.correctAnswer}</p>
                    <div className="btn-group mb-4">
                        <Link to={`/update-quiz/${question.id}`}>
                            <button className="btn btn-sm btn-outline-warning mr-2">Edit Question</button>
                        </Link>
                        <button
                            className="btn btn-sm btn-outline-warning mr-2"
                            onClick={() => handleDeleteQuestion(question.id)}
                        >Delete Question</button>
                    </div>
                </div>
            ))}

        </section>
    )
    
}