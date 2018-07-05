const express = require('express'),
    router = express.Router(),
    Questao = require('../../models/questao');

//rota para apresentar todas as Questao
router.get('/', async(req, res) => {
    try{

    }catch(err){
        console.log(err);
        res.status(400).send({err: "Erro ao carregar questões"});
    }
});

module.exports = app => app.use('/questao', router);