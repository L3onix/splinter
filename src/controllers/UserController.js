const User = require("../models/User");

async function create(name, email, password) {
    return await User.create({
        name: name,
        email: email,
        password: password,
    });
}

module.exports = {
    create,
};
