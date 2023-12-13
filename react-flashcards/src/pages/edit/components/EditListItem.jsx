import Basic from "./editPanel/components/Basic";
import MCQ from "./editPanel/components/MCQ";

function EditListItem({ question, setEditing, setEditQuestion}) {
    let className = "";

    switch (question.type) {
        case "Basic":
            className = "flashcardEdit"
            break;
        case "MCQ":
            className = "mcqEdit"
            break;
        case "Text":
            className = "textEdit";
            break;
        default:
            break;
    }

    return (<div 
    className={"edit-entry " + className}
    onClick={() => editCard(question)} >
        <p style={{ "paddingLeft": "10px" }}>{question.term}</p>
        <p className="divider">|</p>
        <p>{question.definition}</p>
    </div>);

    function editCard(question) {
        setEditing(true)
        setEditQuestion(question)
        if (question.type === "Basic") { return (<Basic question={question} setEditing={setEditing} />) }
        if (question.type === "MCQ") { return (<MCQ question={question} setEditing={setEditing} />) }
        if (question.type === "Text") {
            return (<>
                Text
            </>);
        }
        return ("Card not found.");
    }
}

export default EditListItem;