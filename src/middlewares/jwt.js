const jwt = require('jsonwebtoken')

const jwtValidate = (req, res, next) => {
    const authKey = req.headers["authorization"];
    const chavePrivada = "consolelog.com.br";

    jwt.verify(authKey, chavePrivada, (err, userInfo) => {
        if (err) {
            res.status(403).end();
            return;
        }

        req.userInfo = userInfo;
        next();
    });
}

module.exports = jwtValidate