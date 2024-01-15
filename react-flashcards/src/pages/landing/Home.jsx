import { Link } from "react-router-dom";

export default function Home() {
    const BASE_URL = "/demo/flashcard-app"
    
    return(<>
        <h1>Home</h1>
        <p>Create. Study. Revise.</p>
        <Link to={BASE_URL + "/login"}><button>Log in</button></Link>
        <Link to={BASE_URL + "/sign-up"}><button>Sign up</button></Link>
    </>);
}