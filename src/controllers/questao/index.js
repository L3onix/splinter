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
        res.status(400).send({status: "Erro ao carregar questões"});
    }
});

//rota para apresentar uma Questao por ID
router.get('/:questaoId', async(req, res) => {
    try{
        const questao = await Questao.findById (req.params.questaoId);
        if(questao != null){
            res.status(200).send({questao});
        }else{
            res.status(400).send({status: "Questão não existe"});
        }
    }catch(err){
        console.log(err);
        res.status(400).send({status: "Erro ao carregar questão"});
    }
});

//rota para buscar por descritor
router.get('/descritor/:descritor', async(req, res) => {
    try{
        const questao = await Questao.find({descritor: req.params.descritor});

        return res.status(200).send(questao);
    }catch(err){
        console.log(err);
        res.status(400).send({status: "Erro ao buscar por descritor"});
    }
});

module.exports = app => app.use('/questao', router);