const express = require('express'),
    router = express.Router(),
    Question = require('../../models/question');

//rota para apresentar todas as Questao
router.get('/', async(req, res) => {
    try{
        const question = await Question.find();

        return res.status(200).send(question);
    }catch(error){
        console.log(error);
        res.status(400).send({error: "Erro ao carregar questões"});
    }
});

//rota para apresentar uma Questao por ID
router.get('/:questionId', async(req, res) => {
    try{
        const question = await Question.findById (req.params.questionId);
        if(question != null){
            res.status(200).send({question});
        }else{
            res.status(400).send({error: "Questão não existe"});
        }
    }catch(error){
        console.log(error);
        res.status(400).send({error: "Erro ao carregar questão"});
    }
});

//rota para buscar por descritor
router.get('/matter/:matter', async(req, res) => {
    try{
        const questions = await Question.find({matter: req.params.matter});

        return res.status(200).send(questions);
    }catch(error){
        console.log(error);
        res.status(400).send({error: "Erro ao buscar por descritor"});
    }
});

module.exports = app => app.use('/question', router);