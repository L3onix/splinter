/*
 * Neste arquivo estarão disponíveis as rotas que qualquer usuário,
 * incluse anônimos, sendo assim não requerem autenticação (token na requisição da url)
 */

const express = require('express'),
    router = express.Router(),
    Question = ('../model/question');

//rota principal do controller
router.get('/', async (req, res) => {
    //res.status(200).send({ok: true});
    try{
        const questions = await Question.find();

        return res.status(200).send({questions});
    }catch(err){
        return res.status(400).send({error: 'Erro ao carregar questões'});
    }
});

//rota que retorna questão específica
router.get('/:projectID', async (req, res) => {
    res.send(200).send({ok:true});
});


module.exports = app => app.use('/questions', router);