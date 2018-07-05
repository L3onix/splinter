const express = require('express'),
    router = express.Router(),
    Questao = require('../../models/questao');

//rota para apresentar todas as Questao
router.get('/', async(req, res) => {
    try{
        const questao = await Questao.find();

        return res.status(200).send(questao);
    }catch(err){
        console.log(err);
        res.status(400).send({err: "Erro ao carregar questões"});
    }
});

module.exports = app => app.use('/questao', router);