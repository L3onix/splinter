const jwt = require("jsonwebtoken");

const jwtValidate = (req, res, next) => {
    const authKey = req.headers["authorization"];
    const chavePrivada = "teste.teste.com";

    jwt.verify(authKey, chavePrivada, (err, userInfo) => {
        if (err) {
            res.status(403).end();
            return;
        }
        delete userInfo.payload.password;
        req.userInfo = userInfo;
        next();
    });
};

module.exports = jwtValidate;
