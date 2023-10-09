const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const jwtValidate = require('../middlewares/jwt')


router.get("/status", jwtValidate, (req, res) => {
    res.status(200).json(req.userInfo)
})

router.post('/login', (req, res) => {
    const { login, password } = req.body
    if (login === 'teste' && password === 'default1') {

        const dadosUsuario = {
            nome: "marcelo",
            email: "teste@gmail.com",
            id: 1
        };
        
        const chavePrivada = "consolelog.com.br";

        jwt.sign(dadosUsuario, chavePrivada, (err, token) => {
            if (err) {
                res
                    .status(500)
                    .json({ mensagem: "Erro ao gerar o JWT" });

                return;
            }

            res.set("x-access-token", token);
            res.end();
        });
    } else {
        res.status(401)
        res.end()
    }
})

module.exports = router