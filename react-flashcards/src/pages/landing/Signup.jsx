import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context";
import { useNavigate } from 'react-router-dom';
import saltify from "../../scripts/saltify";
import axios from "axios";
// import "./Login.css";

export default function Signup() {
    const [user] = useContext(UserContext);

    // Local state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (user.loggedIn) {
            console.log("User is logged in.");
            return navigate("/");
        }
    }, [navigate, user.loggedIn]);

    return (<div className="login">
        <h1>Sign up</h1>
        <p>Start managing your recipes.</p>
        <input placeholder="username" value={email} onChange={event => setEmail(event.target.value)} />
        <input placeholder="password" value={password} onChange={event => setPassword(event.target.value)} type="password" />
        <button type="submit" onClick={clickSignUp}>Sign up</button>
        <h3>{loginMessage}</h3>
    </div>);


    async function clickSignUp() {
        if (email === "" || password === "") {
            setLoginMessage("Please fill in email and password.");
            return;
        }

        try {
            const result = await axios.post("http://localhost:3001/create-user", {
                salt: await saltify(email + password)
            });

            switch (result.data) {
                case "User exists":
                    setLoginMessage("User alredy exists.");
                    break;
                case "Success":
                    navigate("/login");
                    break;
                default:
                    setLoginMessage("Error signing up.");
            }
        } catch (error) {
            // setLoginMessage(error);
            console.log(error)
        }
    }
}