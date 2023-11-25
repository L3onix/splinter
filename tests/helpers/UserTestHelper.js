const User = require("../../src/models/User");
const { encryptPassword } = require("../../src/helpers/BcryptHelper");
const { generateAccessToken } = require("../../src/helpers/JwtHelper");

function createNewUser(name, email, password) {
    return User.create({
        name: name,
        email: email,
        password: String(encryptPassword(password)),
    });
}

function deleteAllUsers() {
    User.deleteMany({});
}

function deleteUserById(id) {
    User.deleteOne(id);
}

function getAccessTokenByUser(user) {
    return generateAccessToken(user);
}

module.exports = {
    createNewUser,
    deleteAllUsers,
    deleteUserById,
    getAccessTokenByUser,
};
