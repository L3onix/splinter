const express = require('express'),
    router = express.Router(),
    authMiddleware = require('../middlewares/auth'),
    Solucao = require('../models/solucao'),
    Usuario = require('../models/user'),
    Questao = require('../models/questao');

router.use(authMiddleware);

//rota para a criação de solucao
router.post('/:questaoId', async(req, res) => {
    //res.send({ok: true});

    try{
        //buscando usuário
        const questao = await Questao.findById(req.params.questaoId);
        //console.log(questao.solucoes);
        //criando nova solução
        const solucao = await Solucao.create({...req.body, createBy:req.userId});
        //atualiza a questão com o id da solução
        await Questao.update({_id: req.params.questaoId}, {$push: {solucoes: solucao.id}});
        //console.log(solucao.id);

        return res.status(200).send({upload: true});
    }catch(err){
        console.log(err);
        return res.status(400).send({error: 'Erro ao criar nova solução'});
    }
});

router.put('/:solucaoId', async (req, res) => {
    
});

//exportar rota para rota principal
module.exports = app => app.use('/solucaoAuth', router);