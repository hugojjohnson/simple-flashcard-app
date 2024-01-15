import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./Context";

// Components
import Study from './pages/study/Study.jsx';
import Header from './components/Header';
import Edit from "./pages/edit/Edit.jsx";
import Profile from './pages/profile/Profile.jsx';
import Home from './pages/landing/Home.jsx';
import Signup from './pages/landing/Signup.jsx';
import Login from './pages/profile/Login.jsx';
import axios from 'axios';
// const nice = require("./UserAPI.js")

function App() {
  // console.log(localStorage.getItem('flashcard-token') !== null);

  const [user, setUser] = useState({
    loggedIn: localStorage.getItem('flashcard-token') !== null,
    token: localStorage.getItem('flashcard-token'),
    profile: localStorage.getItem("flashcard-pfp") === null ? "default" : localStorage.getItem("flashcard-pfp")
  });
  const BASE_URL = "/demo/flashcard-app"
  const BASE_API = "https://react-flashcards-backend-edd1c24981f6.herokuapp.com/"

  useEffect(() => {
    async function checkToken() {
      const response = await axios.post(BASE_API + "verify-token", {
        token: user.token
      });
      if (response.data === "Logged in!") {
        return;
      } else if (response.data === "Token not valid.") {
        setUser({ ...user, loggedIn: false });
        localStorage.removeItem("flashcard-token");
        console.error("Token was invalid. Deleting.");
        return;
      } else {
        console.log("error: " + response.data);
        return;
      }
    }
    checkToken();
  }, []);

  return (<UserContext.Provider value={[user, setUser]}>
    <BrowserRouter>
      <Routes>
        <Route path={BASE_URL} element={<Header />}>
          <Route index element={<Home />} />
          <Route path={BASE_URL + "/sign-up"} element={<Signup />} />
          <Route path={BASE_URL + "/login"} element={<Login />} />

          {user.loggedIn === true ? (<>
          <Route path={BASE_URL + "/study"} element={<Study />} />
          <Route path={BASE_URL + "/edit"} element={<Edit />} />
          <Route path={BASE_URL + "/profile"} element={<Profile />} />
          </>)
          : (
            <Route path="*" element={<p>You must be logged in.</p>} />
          )}
          {/* <Route path="*" element={<p>404 not found</p>} /> */}
        </Route>
        


      </Routes>
    </BrowserRouter>
  </UserContext.Provider>);

}

export default App;
