import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../../../Context";
import axios from "axios";

export default function Text({ question, setEditing }) {
    const [user] = useContext(UserContext);
    const [term, setTerm] = useState("");
    const [definition, setDefinition] = useState("");

    useEffect(() => {
        if (question !== undefined) {
            setTerm(question.term);
            setDefinition(question.definition);
        }
    }, [question]);

    return (<>
        <input autoFocus name="term" placeholder="term" value={term} onChange={(e) => setTerm(e.target.value)} />
        <input name="definition" placeholder="definition" value={definition} onChange={(e) => setDefinition(e.target.value)} />
        <button type="submit" onClick={handleSubmit} />
    </>);

    async function handleSubmit() {
        if (term === "" || definition === "") { alert("Please fill in all fields.") }
        let finalCard = {
            "id": Math.random().toString(36).substring(2, 14),
            "type": "Text",
            "term": term,
            "definition": definition
        };

        if (question !== undefined) {
            finalCard.id = question.id;
            try {
                await axios.post('http://localhost:3001/update-card', {
                    token: user.token,
                    newCard: JSON.stringify(finalCard)
                });
                setEditing(false);
            } catch (error) {
                alert("there has been an error");
                console.error(error);
            }
            return;
        }

        try {
            await axios.post('http://localhost:3001/add-card', {
                token: user.token,
                newCard: JSON.stringify(finalCard)
            });
            setEditing(false);
        } catch (error) {
            alert("there has been an error");
            console.error(error);
        }
    }
}