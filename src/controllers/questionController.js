/*
 * Neste arquivo estarão disponíveis as rotas que qualquer usuário,
 * incluse anônimos, sendo assim não requerem autenticação (token na requisição da url)
 */

const express = require('express'),
    router = express.Router(),
    Questao = require('../models/questao');

//rota para apresentar todas as questões
router.get('/', async (req, res) => {
    //res.status(200).send({ok: true});
    
    try{
        const questoes = await Questao.find().populate('user');

        return res.status(200).send({questoes});
    }catch(err){
        console.log(err);
        return res.status(400).send({error: 'Erro ao carregar questões'});
    }
});

//rota que retorna questão específica
router.get('/questao/:questionID', async (req, res) => {
    res.send(200).send({ok:true});
});

//rota de busca por eixo
router.get('/eixo/:eixo', async (req, res) => {
    //res.send(200).send({ok: true});
    try{
        //console.log(req.params.eixo);
        const questoes = await Questao.find({'eixo': req.params.eixo});

        return res.status(200).send({questoes});
    }catch(err){
        console.log(err);
        return res.status(400).send({error: 'Erro ao carregar eixo'});
    }
});


module.exports = app => app.use('/questions', router);