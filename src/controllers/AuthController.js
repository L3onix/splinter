const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const privateKey = "teste.teste.com";
const saltRounds = 10;

async function signUpUser(req, res) {
    try {
        const { name, email, password } = req.body;
        await User.create({
            name: name,
            email: email,
            password: String(encryptPassword(password)),
        }).then((newUser) => {
            if (!newUser) res.status(400).end();
            delete newUser.password;
            const token = generateAccessToken(newUser);
            res.set("x-access-token", token);
            res.status(201).json({ success: true, data: newUser }).end();
        });
    } catch (error) {
        console.log(error);
        res.status(400).end();
    }
}

async function signInUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (isMatchedPassword(password, user)) {
            delete user.password;
            const token = generateAccessToken(user);
            res.status(200).set("x-access-token", token).end();
        }
        res.status(400).end();
    } catch (error) {
        console.log(error);
        res.status(400).end();
    }
}

async function encryptPassword(password) {
    return bcrypt.hashSync(password, saltRounds);
}

async function isMatchedPassword(password, user) {
    return await bcrypt.compare(password, user.password);
}

function generateAccessToken(user) {
    return jwt.sign({ payload: user }, privateKey);
}

module.exports = {
    signInUser,
    signUpUser,
};
