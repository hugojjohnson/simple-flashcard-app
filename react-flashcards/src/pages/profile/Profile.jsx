import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../Context";

export default function Profile() {
    const [user, setUser] = useContext(UserContext);
    const [profiles, setProfiles] = useState([]);
    // recipe.image = (`http://localhost:3001/profile-pic?profileName=${encodeURIComponent(notSureYet)}`);

    const BASE_API = "https://react-flashcards-backend-edd1c24981f6.herokuapp.com/"

    useEffect(getProfiles());

    const profileList = profiles.map((profile, index) => {
        console.log(index)
        return (
            <img style={{"width": "150px", "height": "150px", "borderRadius": "50%", "border": "1px solid grey",
            "margin": "10px" }}
            key={index}
                src={BASE_API + `profile-pic?profileName=${encodeURIComponent(profile)}`}
            alt="profile option"
            onClick={() => {
                localStorage.setItem("flashcard-pfp", profile);
                setUser({ ...user, profile: profile });
            }} />
        );
    });


    return (<>
        <h1 style={{"marginLeft": "10px"}}>Profile photo</h1>
        <div style={{"display": "flex", "flexDirection":"row"}}>
            {profileList}
        </div>
        <button onClick={() => logOut()}>Log out</button>
    </>);

    
    function logOut() {
        setUser({
            user,
            loggedIn: false,
            token: null
        });
        localStorage.removeItem('flashcard-token');

    }


    async function getProfiles() {
        console.log("Getting profiles")
        const response = await axios.get(BASE_API + "profile-pics");
        const myProfiles = Object.keys(response.data);

        setProfiles(myProfiles);

        // const hi = profiles.map(profile => {
        //     console.log("hi");
        //     return <p>Hi {profile}</p>
        // });

        // console.log(hi);
    }
}