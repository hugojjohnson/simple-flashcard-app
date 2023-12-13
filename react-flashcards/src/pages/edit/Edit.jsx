
import EditListItem from "./components/EditListItem";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import EditPanel from "./components/editPanel/EditPanel";
import { UserContext } from "../../Context";


function Edit() {
    const [user] = useContext(UserContext);
    const [questions, setQuestions] = useState(undefined);
    const [editing, setEditing] = useState(false);
    const [editQuestion, setEditQuestion] = useState(undefined);

    useEffect(() => {
        axios.post("http://localhost:3001/questions", {
            token: user.token
        })
            .then(response => setQuestions(response.data));
    }, [user, editing]);
    <h1 className="title">Edit</h1>

    if (questions === undefined) {
        return(<>Loading</>);
    }


    const body = <>
        {questions.map((question, index) => {
            return (question !== null && <EditListItem
                key={index}
                question={question}
                setEditing={setEditing}
                setEditQuestion={setEditQuestion} />)
        })}
    </>

    return(<div className="edit-list">
        {editing && <EditPanel question={editQuestion} setEditing={setEditing} />}
        <h2 
        style={{"border": "none", "borderRadius": "20%", "backgroundColor": "lightgrey", "padding": "10px"}}
            onClick={() => {
                setEditQuestion(undefined)
                setEditing(true)
            }}>Add card</h2>
            {
                questions.length > 0 
                ? body
                : "You have no cards yet. Create some now!"
            }
    </div>);
}

export default Edit;