import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../../Context";
import axios from "axios";

export default function MCQ({ question, setEditing }) {
    const [user] = useContext(UserContext);
    const [term, setTerm] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [correctOption, setCorectOption] = useState(0);

    useEffect(() => {
        if (question !== undefined) {
            setTerm(question.term);
            setOptions(question.options);
            setCorectOption(question.correctIndex + 1);
        }
    }, [question]);

    return (<>
        <input name="term" placeholder="term" value={term} onChange={(e) => setTerm(e.target.value)} />
        <div style={{"display": "flex", "flexDirection": "column"}}>
        {
            options.map((option, index) => <input 
                key={index}
                style={{ "marginTop": "10px", "marginBottom": "10px", "width": "65%" }} 
                placeholder={"Option " + (index+1)}
                value={options[index]}
                onChange={(e) => {
                    let oldOptions = [...options]
                    oldOptions[index] = e.target.value
                    setOptions(oldOptions)
                }} />
            )
        }
        </div>
        <input type="number" placeholder="0" value={correctOption} onChange={(e) => setCorectOption(e.target.value)} />
        <button type="submit" onClick={handleSubmit} />
    </>);

    async function handleSubmit() {
        console.log(options.filter(option => option === "").length);
        if (term === "" || options.filter(option => option === "").length > 0) { alert("Please fill in all fields."); return; }
        if (correctOption === -1) { alert("Please set a correct option."); return; }
        if (correctOption < 1 || correctOption > options.length) { alert("Correct option is not an option."); return; }

        let finalCard = {
            "id": Math.random().toString(36).substring(2, 14),
            "type": "MCQ",
            "term": term,
            "options": options,
            "correctIndex": (parseInt(correctOption) - 1)
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
                console.log(error);
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
            console.log(error);
        }
    }
}

// {
//     "type": "MCQ",
//         "term": "What is the capital of france??",
//             "options": [
//                 "Paris",
//                 "Bologna",
//                 "Pisa",
//                 "France"
//             ],
//                 "correctIndex": 0
// },