import { useState, useEffect, useContext } from 'react';
import axios from "axios";

import './flashcard.css';

// Components
import SimpleFlashcard from "./components/SimpleFlashcard";
import MultipleChoice from './components/MultipleChoice';
import TextCard from './components/TextCard';
import { UserContext } from '../../Context';


export default function Study() {
    const [user] = useContext(UserContext);
    const [questions, setQuestions] = useState(undefined);
    const BASE_API = "https://react-flashcards-backend-edd1c24981f6.herokuapp.com/"

    useEffect(() => {
        async function getQuestions() {
            const response = await axios.post(BASE_API + "questions", {
                token: user.token
            });
            console.log("got questions: " + response.data);
            setQuestions(response.data);
        }
        try {
            getQuestions();
        } catch (error) {
            console.error(error);
        }
    }, [user.token]);

    const [index, setIndex] = useState(0);
    const question = (questions !== undefined && questions.length > 0) ? questions[index] : "";

    // 
    const [questionCorrect, setQuestionCorrect] = useState(undefined);
    // sets to false when you click 'check answer' so you can't change your answer after the fact.
    const [canEditQuestion, setCanEditQuestion] = useState(true);
    const [hideAnswer, setHideAnswer] = useState(true);


    if (questions === undefined) {
        return(<>Loading</>);
    }
    if (questions.length === 0) {
        return (<>You have no cards yet! Go create some.</>);
    }
    return(<div className="app">
        <h1 className="title">Study</h1>
        <h3 className="term">{question.term}</h3>
        {
            (question.type === "Flashcard" && <SimpleFlashcard question={question} />)
        }
        {
            (question.type === "MCQ" && <MultipleChoice 
            question={question} 
            setQuestionCorrect={setQuestionCorrect}
            canEditQuestion={canEditQuestion} />)
        }
        {
            (question.type === "Text" && <TextCard 
            question={question}
            setQuestionCorrect={setQuestionCorrect}
            canEditQuestion={canEditQuestion} />)
        }

        <div className="buttons">
            <button id="check" type="button" 
            className= {
                hideAnswer ? ""
                : questionCorrect === undefined ? ""
                : questionCorrect === false ? "incorrect"
                : "correct"
            }
                onClick={handleCheckButton}
            >Check definition</button>

            <button id="next" type="button" onClick={handleNextButton} >Next</button>
        </div>
    </div>);

    function handleNextButton() {
        setQuestionCorrect(undefined);
        setCanEditQuestion(true);
        setHideAnswer(true);
        if (index === questions.length-1) {
            setIndex(0)
        } else {
            setIndex(index + 1)
        }
    }
    function handleCheckButton() {
        if (questionCorrect === undefined) { 
            return
        }
        setHideAnswer(false)
        setCanEditQuestion(false)
    }

}