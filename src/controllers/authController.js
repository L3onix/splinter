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
    }catch(error){    //tratamento de erro da tentativa
        //resposta da requisão com falha
        console.log(error);
        return res.status(400).send({error: 'Falha no cadastro'});
    }
});

//rota para efetuar autenticação do usuário
router.post('/authenticate', async(req, res) => {
    //define variável email e password com a variáveis do corpo da requisição
    const {email, password} = req.body;

    //busca usuário com email igual ao da variável acima
    const user = await User.findOne({email}).select('+password');

    //checa se a consulta acima retornou um resultado
    if(!user){
        return res.status(400).send({error: 'Usuário não encontrado'});
    }
    //compara senha da requisição com o da busca no do banco
    if(!await bcrypt.compare(password, user.password)){
        return res.status(400).send({error: 'Senha inválida'});
    }

    //limpa a variável password
    user.password = undefined;

    //resposta da requisição com sucesso
    //retorna os dados do usuário e o token de acesso
    res.status(200).send({
        user,
        token: gerateToken({id: user.id})
    });
});

module.exports = app => app.use('/auth', router);
