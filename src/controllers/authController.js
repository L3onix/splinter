const express = require('express'),
    User = require('../models/user'),
    router = express.Router(),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    authConfig = require('../config/auth');

//função para gerar token
function gerateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    });
}

//rota para efetuar cadastro de usuário
router.post('/register', async(req, res) => {
    //define variável email com o email do corpo da requisição (req.body)
    const {email} = req.body;

    //tentativa de cadastrar usuário
    try{
        //checa se já existe usuário cadastrado com esse email
        if(await User.findOne({email})){
            return res.status(400).send({error: 'Usuário já existe'});
        }
        
        //cria usuário utilizando corpo da requisição (req.body)
        const user = await User.create(req.body);

        //limpa a campo password do usuário
        user.password = undefined;

        //resposta da requisição com sucesso
        //retorna os dados do usuário e o token de acesso
        return res.send({
            user,
            token: gerateToken({id: user.id})
        });
    }catch(err){    //tratamento de erro da tentativa
        //resposta da requisão com falha
        return res.status(400).send({error: 'Falha no cadastro'});
    }
});



module.exports = app => app.use('/auth', router);
