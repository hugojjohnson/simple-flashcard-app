import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context";
import { useNavigate } from 'react-router-dom';
import saltify from "../../scripts/saltify";
import axios from "axios";
// import "./Login.css";

export default function Login() {
    const [user, setUser] = useContext(UserContext);

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
        <h1>Log in</h1>
        <p>Start managing your recipes.</p>
        <input placeholder="username" value={email} onChange={event => setEmail(event.target.value)} />
        <input placeholder="password" value={password} onChange={event => setPassword(event.target.value)} type="password" />
        <button type="submit" onClick={clickLogIn}>Log in</button>
        <h3>{loginMessage}</h3>
    </div>);


    async function clickLogIn() {
        if (email === "" || password === "") {
            setLoginMessage("Please fill in email and password.");
            return;
        }

        try {
            const result = await axios.post("http://localhost:3001/log-in", {
                salt: await saltify(email + password)
            });


            if (result.status === 200 && result.data === "User does not exist.") {
                setLoginMessage("Incorrect email or password.");
                return;
            } else if (result.status === 200) {
                setUser({...user, loggedIn: true, token: result.data.token, profile: result.data.profile });
                localStorage.setItem("flashcard-token", result.data);
                navigate("/study");
                return;
            }
        } catch (error) {
            // setLoginMessage(error);
            console.log(error)
            setLoginMessage("Incorrect email or password.");
        }
    }
}