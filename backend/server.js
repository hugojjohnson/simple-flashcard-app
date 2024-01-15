const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');


const userAPI = require("./databases/userAPI");
const { readJson } = require("./databases/dataAPI");

const FRONTEND_PATH = '/../react-flashcards/build/'

app.use((req, res, next) => {
    // If you want to send JSON, you need this middleware, which sents the Content-Type header.
    res.setHeader('Content-Type', 'application/json');
    next();
});
var allowCrossDomain = function (req, res, next) {
    // Something called CORS; I'm not sure what it is but we need this code here.
    // res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header('Access-Control-Allow-Origin', "https://hugojjohnson.github.io");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);
app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); // Update the origin with your frontend's URL
// You need both of these lines to be able to accept JSON from a post request.
app.use(express.urlencoded({ extended: true })); // So we can use forms with req.body.variableName
app.use(express.json());


// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, FRONTEND_PATH)))



// USER === Create, Read, Update, Delete ===
app.post("/create-user", (req, res) => {
    userAPI.createUser(req, res);
});
app.post("/log-in", (req, res) => {
    userAPI.logIn(req, res);
});
app.post("/verify-token", (req, res) => {
    userAPI.handleVerify(req, res);
});


// QUESTIONS
app.post("/questions", (req, res) => {
    userAPI.getCards(req, res);
});
app.post("/add-card", (req, res) => {
    userAPI.addCard(req, res);
});
app.post("/update-card", (req, res) => {
    userAPI.updateCard(req, res);
});
app.post("/delete-card", (req, res) => {
    userAPI.deleteCard(req, res);
});

// PROFILE
app.get("/profile-pics", (req, res) => {
    userAPI.getAllProfilePics(req, res);
});

app.get("/profile-pic", (req, res) => {
    userAPI.getProfilePic(req, res);
});



// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
    // res.send("Page not found.");
    // res.end();
    res.sendFile(path.join(__dirname + FRONTEND_PATH + 'index.html'))
})


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));

// app.listen(process.env.PORT);