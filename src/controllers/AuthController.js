const User = require("../models/User");
const { create } = require("../controllers/UserController");
const {
    encryptPassword,
    isMatchedPassword,
} = require("../helpers/BcryptHelper");
const { generateAccessToken } = require("../helpers/JwtHelper");

async function signUpUser(req, res) {
    try {
        const { name, email, password } = req.body;
        let newUser = await create(
            name,
            email,
            String(await encryptPassword(password))
        );
        if (!newUser) res.status(400).end();
        newUser.password = undefined;
        const token = generateAccessToken(newUser);
        res.set("x-access-token", token);
        res.status(201).json({ success: true, data: newUser }).end();
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
            user.password = undefined;
            const token = generateAccessToken(user);
            res.status(200).set("x-access-token", token).end();
        }
        res.status(400).end();
    } catch (error) {
        console.log(error);
        res.status(400).end();
    }
}

module.exports = {
    signInUser,
    signUpUser,
};
