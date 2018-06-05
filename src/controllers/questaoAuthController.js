const express = require('express'),
    router = express.Router(),
    authMiddleware = require('../middlewares/auth'),
    Question = require('../models/questao'),
    Usuario = require('../models/user');

router.use(authMiddleware);

//rota para criar questão
router.post('/', async (req, res) => {
    //res.send({ok: true, user: req.userId});
    const userId = req.userId;

    try{
        //buscando usuário para verificar se ele é professor
        const user = await Usuario.findById(userId);
        //checando se é professor
        if(user.professor === true){
            const question = await Question.create({...req.body, user: req.userId});

            res.status(200).send({question});
        }else{
            res.status(400).send({erro: 'Usuário não é professor'});
        }

    }catch(err){
        console.log(err);
        return res.status(400).send({error: 'Erro ao criar nova questão'});
    }
});

module.exports = app => app.use('/questaoAuth', router);