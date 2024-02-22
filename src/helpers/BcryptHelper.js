const bcrypt = require("bcrypt");
const saltRounds = 10;

async function encryptPassword(password) {
    return bcrypt.hashSync(password, saltRounds);
}

async function isMatchedPassword(password, user) {
    return await bcrypt.compare(password, user.password);
}

module.exports = {
    encryptPassword,
    isMatchedPassword,
};
