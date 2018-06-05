const express = require('express'),
    router = express.Router(),
    authMiddleware = require('../middlewares/auth'),
    Question = require('../models/questao');

router.use(authMiddleware);

//TODO: Deve ser feita a verificação do usuário, se ele é professor
//rota para criar questão
router.post('/', async (req, res) => {
    //res.send({ok: true, user: req.userId});
    try{
        //console.log({body: req.});
        //console.log({eixo: req.body.eixo});
        const question = await Question.create({...req.body, user: req.userId});

        res.status(200).send({question});
    }catch(err){
        return res.status(400).send({error: 'Erro ao criar nova questão'});
    }
});

module.exports = app => app.use('/questaoAuth', router);