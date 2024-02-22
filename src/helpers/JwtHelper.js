const jwt = require("jsonwebtoken");
const privateKey = "teste.teste.com";

function generateAccessToken(user) {
    return jwt.sign({ payload: user }, privateKey);
}

module.exports = { generateAccessToken };
