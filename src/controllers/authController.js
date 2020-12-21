const User = require('../models/user'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    authConfig = require('../config/auth')

function gerateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    });
}

module.exports = class AuthController {
    async register(req, res) {
        const {email} = req.body;
        try{
            if(await User.findOne({email})){
                return res.status(400).send({error: 'Usuário já existe'});
            }
            const user = await User.create(req.body);
            user.password = undefined;

            return res.send({user, token: gerateToken({id: user.id})});
        }catch(error){
            console.log(error);
            return res.status(400).send({error: error.message});
        }
    }
    async authenticate(req, res) {
        const {email, password} = req.body;
        const user = await User.findOne({email}).select('+password');
        if(!user){
            return res.status(400).send({error: 'Usuário não encontrado'});
        }
        if(!await bcrypt.compare(password, user.password)){
            return res.status(400).send({error: 'Senha inválida'});
        }
        user.password = undefined;
        res.status(200).send({user, token: gerateToken({id: user.id})});
    }
}
