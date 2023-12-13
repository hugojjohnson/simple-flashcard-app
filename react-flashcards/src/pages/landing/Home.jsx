import { Link } from "react-router-dom";

export default function Home() {
    return(<>
        <h1>Home</h1>
        <p>Create. Study. Revise.</p>
        <Link to="/login"><button>Log in</button></Link>
        <Link to="/sign-up"><button>Sign up</button></Link>
    </>);
}