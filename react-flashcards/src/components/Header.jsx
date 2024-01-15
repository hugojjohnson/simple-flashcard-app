import { Outlet, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context";
import "./Header.css";
import axios from "axios";


function Header() {
    const [user] = useContext(UserContext);
    const [profileLink, setProfileLink] = useState("/icons/white.jpg");

    const BASE_API = "https://react-flashcards-backend-edd1c24981f6.herokuapp.com/"
    const BASE_URL = "/simple-flashcard-app"

    useEffect(() => {
        async function setPfp() {
            try {
                console.log("user profile: ")
                console.log(user.profile)
                const response = await axios.get("/" + `${BASE_API}profile-pic?profileName=${user.profile}`);
                if (response.status === 200) {
                    setProfileLink(`${BASE_API}profile-pic?profileName=${user.profile}`)
                }
            } catch (error) {
                console.log(error);
                setProfileLink(BASE_API + "/icons/profile.jpeg");
            }
        };
        setPfp();
    }, [user.profile])

    if (!user.loggedIn) {
        return(<>
            <div className="header-parent">

                <Link to={BASE_URL + "/"} className="header left-wrapper">
                    <p>Home</p>
                </Link>

                <Link to={BASE_URL + "/login"} className="header log-in">
                    <p>Log in</p>
                </Link>

                <Link to={BASE_URL + "/sign-up"} className="header sign-up">
                    <p>Sign up</p>
                </Link>
            </div>
            <Outlet />
        </>);
    }

    return(<>
    <div className="header-parent">
    {/* Also marked as header so it's arranged in a column. */}
        <Link to={BASE_URL + "/"} className="header"> 
            <img
                // src="https://upload.wikimedia.org/wikipedia/commons/3/34/Home-icon.svg"
                src={BASE_URL + "/icons/home.svg"}
                alt="Home"
                className="icon" 
            />
            <p>Home</p>
        </Link>

            <Link to={BASE_URL + "/edit"} className="header">
            <img
                // src="https://cdn3.iconfinder.com/data/icons/feather-5/24/edit-512.png"
                src={BASE_URL + "/icons/edit.png"}
                alt="Edit"
                className="icon"
            />
            <p>Edit</p>
        </Link>

        <p>{user.name}</p>

            <Link to={BASE_URL + "/study"} className="header left-wrapper">
            <img
                // src="https://cdn-icons-png.flaticon.com/512/566/566985.png"
                src={BASE_URL + "/icons/study.png"}
                alt="Study"
                className="icon"
            />
            <p>Study</p>
        </Link>

            <Link to={BASE_URL + "/profile"} className="header">
            <img
                id="profile-pic"
                // src="https://static.wikia.nocookie.net/moshimonsters/images/b/bc/Diavlo3-472x480.jpg"
                src={BASE_URL + profileLink}
                alt="Profile"
                className="icon"
            />
            <p>Profile</p>
        </Link>
    </div>
    <Outlet />
    </>);
}

export default Header;