import { useState } from "react";

function TextCard({ question, setQuestionCorrect, canEditQuestion }) {
    // Text
    const [textInput, setTextInput] = useState("");
    
    return (<>
        <input value={textInput} onChange={(event) => handleChange(event)}></input>
    </>);

    function handleChange(event) {
        if (!canEditQuestion) {
            return;
        }
        setTextInput(event.target.value);
        if (event.target.value === question.definition) {
            setQuestionCorrect(true);
        } else {
            setQuestionCorrect(false);
        }
    }
}

export default TextCard;