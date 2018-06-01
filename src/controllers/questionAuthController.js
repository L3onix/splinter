const express = require('express'),
    router = express.Router(),
    authMiddleware = require('../middlewares/auth'),
    Question = require('../models/question');

router.use(authMiddleware);

router.post('/', async (req, res) => {
    //res.send({ok: true, user: req.userId});
    try{
        const question = await Question.create(req.body);

        res.status(200).send({question});
    }catch(err){
        return res.status(400).send({err: 'Erro ao criar nova questão'});
    }
});

module.exports = app => app.use('/questionsAuth', router);