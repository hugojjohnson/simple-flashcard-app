import { useState } from "react";

function SimpleFlashcard({ question }) {

    // Simple
    const [hidden, setHidden] = useState(true);

    // const [hidden, setHidden] = useState(true);
    return(<>
        <h3 className={"definition" + (hidden ? " hidden" : "")}>{question.definition}</h3>
    </>);

}

export default SimpleFlashcard;