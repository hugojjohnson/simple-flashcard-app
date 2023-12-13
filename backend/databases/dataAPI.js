const fs = require("fs");
const util = require('util');



// === Functions === 
async function readJson(path) {
    try {
        const myData = await fs.readFileSync(path);
        let json;
        json = JSON.parse(myData)
        return json;
    } catch (err) {
        const errorMsg = 'An error occured while reading from ' + path + ".\n\n"
        throw new Error (errorMsg);
    }
}

async function writeJson(path, data) {
    try {
        fs.writeFileSync(path, JSON.stringify(data, null, "\t"));
    } catch (err) {
        const errorMsg = 'An error occured while writing to ' + path + ".\n\n"
        throw new Error(errorMsg + err);
    }
}

function sendError(res, error, message) {
    // RUNNING SEND ERROR
    res.status(500).send(message);
    res.end();
    console.error(error);
}

module.exports = { readJson, writeJson, sendError };