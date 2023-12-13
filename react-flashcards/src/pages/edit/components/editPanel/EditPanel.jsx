import "./EditPanel.css";
import { useState } from "react";
import Basic from "./components/Basic";
import MCQ from "./components/MCQ"
import Text from "./components/Text";

// enum cardTypeEnum {
//     Basic,
//     MCQ,
//     Text
// }

export default function EditPanel({ question, setEditing }) {
    const [cardType, setCardType] = useState("Basic")
    return(<>
        <div className="background" onClick={() => setEditing(false)} />

        {/* We didn't use a form because it refreshes every time you click submit. */}
        <div className="edit-panel">
            { question === undefined ? (<>
            <label>Card type:</label>
            <select name="card-type"
            onChange={(e) => setCardType(e.target.value)}>
                <option value="Basic">Basic</option>
                <option value="MCQ">MCQ</option>
                <option value="Text">Text</option>
            </select>
            </>)
            : "Edit question"}
            {question === undefined 
            ? formInside(cardType)
            : formInside(question.type) }
        </div>
    </>);

    function formInside(type) {
        if (type === "Basic") { return (<Basic question={question} setEditing={setEditing} />) }
        if (type === "MCQ") { return (<MCQ question={question} setEditing={setEditing} />) }
        if (type === "Text") { return (<Text question={question} setEditing={setEditing} />) }
        return ("Card not found.");
    }
}