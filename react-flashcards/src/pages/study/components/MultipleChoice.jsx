import { useState } from "react";

function MultipleChoice({ question, setQuestionCorrect, canEditQuestion }) {
    const [multipleChoiceSelected, setMultipleChoiceSelected] = useState(-1);

    function findCorrect(index) {
        if (index === -1) {
            return undefined;
        }
        if (index === question.correctIndex) {
            return true;
        }
        return false;
    }

    return (<>
        <div className="mcq">
            { 
                question.options.map((option, index) => {
                    return <h3 key={index} onClick={() => selectAnswer(index)} 
                    className={index === multipleChoiceSelected
                    ? "selected" : ""}>{option}</h3>
                })
            }
        </div>
    </>);

    function selectAnswer(index) {
        if (!canEditQuestion) {
            return;
        }
        setMultipleChoiceSelected(index);
        const thisIsCorrect = findCorrect(index)
        console.log("thisIsCorrect:" + thisIsCorrect)
        setQuestionCorrect(thisIsCorrect)


    }

}

export default MultipleChoice;