const path = require("path");
const crypto = require('crypto');
const { readJson, writeJson, sendError } = require("./dataAPI");



// create a user
async function createUser(req, res) {
    try {
        const salt = req.body.salt;
        const users = await readJson("./databases/users.json");

        if (salt in users) {
            res.send("User exists");
            return;
        }
        users[salt] = {
            profile: "default"
        };

        writeJson("./databases/users.json", users);
        res.send("Success");
    } catch (error) {
        sendError(res, error, "An error occured while creating a user.");
    }
}

// log in a user
    // authenticate salt
    // generate and log token
async function logIn(req, res) {
    try {
        const salt = req.body.salt;
        if (! await authenticatedSalt(salt)) {
            res.send("User does not exist.");
            res.end();
            console.error("User does not exist: IOUHIGy")
            return;
        }

        const token = await generateToken(salt);
        const tempAllSalts = await readJson("./databases/users.json")
        const profile = tempAllSalts[salt].profile
        res.send({
            token,
            profile
        });
        res.end();
    } catch (error) {
        sendError(res, error, "An error occured while logging in.");
    }


    // Helper functions
    async function authenticatedSalt(salt) {
        try {
            const allSalts = await readJson("./databases/users.json")
            return (salt in allSalts);
        } catch (error) {
            throw new Error(error);
        }
    }

    async function generateToken(salt) {
        try {
            let tokensJson = await readJson("./databases/tokens.json");
            if (tokensJson[salt] === undefined) {
                tokensJson[salt] = [];
            }
            const newToken = crypto.randomBytes(Math.ceil(30 / 2)).toString('hex').slice(0, 30);
            tokensJson[salt].push({
                value: newToken,
                created: new Date()
            });
            await writeJson("./databases/tokens.json", tokensJson);
            return newToken
        } catch (error) {
            throw new Error(error);
        }
    }
}

// verify a token
async function handleVerify(req, res) {
    try {
        const salt = await tokenToSalt(req.body.token);
        if (salt === undefined) {
            res.send("Token not valid.");
            res.end();
            console.error("Token is not valid: HOGIUhougi");
            return;
        }
        res.send("Logged in!");
    } catch (error) {
        sendError(res, error, "An error occured verifying token.");
    }
}

async function tokenToSalt(token) {
    if (token === undefined) {
        throw new Error ("Token is undefined.");
    }
    try {
        let tokensJson = await readJson("./databases/tokens.json");

        for (const userName of Object.keys(tokensJson)) {
            const user = tokensJson[userName];
            for (const keyObj of user) {
                if (keyObj.value === token) {
                    return (userName);
                }
            }
        }
        return undefined;
    } catch (error) {
        throw new Error(error);
    }
}

// get a user's cards
    // verify token
async function getCards(req, res) {
    try {
        // Verify token
        const salt = await tokenToSalt(req.body.token);
        if (salt === undefined) {
            res.status(403).send("You need to be logged in to see cards.");
            res.end();
            console.error("User is not logged in: IOuhafaeff");
            return;
        }

        const cardsJson = await readJson("./databases/questions.json");
        let usersCards = cardsJson[salt];
        if (usersCards === undefined) {
            usersCards = [];
        }
        // return imagePath
        res.send(usersCards);
    } catch (error) {
        sendError(res, error, "There was a problem loading your cards.");
    }
}

// Add a card
async function addCard(req, res) {
    try {
        // Verify token
        const salt = await tokenToSalt(req.body.token);
        if (salt === undefined) {
            res.status(403).send("You need to be logged in to see cards.");
            res.end();
            console.error("User was not logged in properly: FHhaAFefH")
            return;
        }
        
        let newCard;
        try {
        newCard = await JSON.parse(req.body.newCard);
        } catch (error) {
            sendError(res, error, "Incorrect JSON format.");
            return;
        }

        let cardsJson = await readJson("./databases/questions.json");
        if (cardsJson[salt] === undefined) {
            cardsJson[salt] = [];
        }

        cardsJson[salt].push(newCard);
        await writeJson("./databases/questions.json", cardsJson);

        // return imagePath
        res.send("You want to add " + newCard.id);
    } catch (error) {
        sendError(res, error, "There was a problem loading your cards.");
    }
}


// Update a card
async function updateCard(req, res) {
    try {
        // Verify token
        const salt = await tokenToSalt(req.body.token);
        if (salt === undefined) {
            res.status(403).send("You need to be logged in.");
            console.error("User was not logged in properly: HOHYGUgiyi")
            res.end();
            return;
        }

        try {
            newCard = await JSON.parse(req.body.newCard);
        } catch (error) {
            sendError(res, error, "Incorrect JSON format.");
            return;
        }

        let cardsJson = await readJson("./databases/questions.json");
        if (cardsJson[salt] === undefined) {
            cardsJson[salt] = [];
        }
        // remove copies with the same id
        cardsJson[salt] = cardsJson[salt].filter(card => card.id !== newCard.id);

        cardsJson[salt].push(newCard);
        await writeJson("./databases/questions.json", cardsJson);

        // return imagePath
        res.send("You want to add " + newCard.id);
    } catch (error) {
        sendError(res, error, "There was a problem loading your cards.");
    }
}

// Delete a card
async function deleteCard(req, res) {
    try {
        // Verify token
        const salt = await tokenToSalt(req.body.token);
        if (salt === undefined) {
            res.status(403).send("You need to be logged in.");
            console.error("User was not logged in properly: UYGigyu")
            res.end();
            return;
        }

        const deleteCardId = req.body.deleteCardId;

        let cardsJson = await readJson("./databases/questions.json");
        if (cardsJson[salt] === undefined) {
            cardsJson[salt] = [];
        }

        if (cardsJson[salt].filter(card => card.id === deleteCardId).length === 0) {
            res.status(400).send("No card with that id is found.");
            console.error("No card with that Id was found: TUYGIji")
            return;
        }

        cardsJson[salt] = cardsJson[salt].filter(card => card.id !== deleteCardId);
        await writeJson("./databases/questions.json", cardsJson);

        // return imagePath
        res.send("Card deleted.");
    } catch (error) {
        sendError(res, error, "There was a problem loading your cards.");
    }
}

// update user's cards
    // verify token

// get all profile photos
async function getAllProfilePics(req, res) {
    try {
        const myJson = await readJson("./databases/profile-pics.json");
        res.send(myJson);
    } catch (error) {
        sendError(res, error, "An error occured getting profile photo list.");
    }
}


// get a user's profile photo
    // verify token
async function getProfilePic(req, res) {
    // recipe.image = (`http://localhost:3001/profile-pic?profileName=${encodeURIComponent(notSureYet)}`);
    try {
        const myJson = await readJson("./databases/profile-pics.json");
        const fileName = myJson[req.query.profileName];
        if (fileName === undefined) {
            res.status(500).send("Profile does not exist.");
            console.error("Profile does not exist: IOHUGIYuft")
            return;
        }
        const imagePath = path.join(__dirname, "profile-pics", fileName);
        res.sendFile(imagePath);
        // res.send("yay");
    } catch (error) {
        sendError(res, error, "An error occured getting the phofile photo.");
    }
}

// update a user's profile photo
    // verify token

module.exports = { getCards, getAllProfilePics, getProfilePic, createUser, logIn, handleVerify, addCard, updateCard, deleteCard }