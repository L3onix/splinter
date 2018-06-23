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
    const userId = req.userId;
    //console.log (userId);

    try{
        //bucando solução
        const solucao = await Solucao.findById(req.params.solucaoId);

        //se o id da requisição é igual o id do criador
        if(solucao.createBy == req.userId){
            const editado = await Solucao.findByIdAndUpdate(req.params.solucaoId, req.body, {new: true});
            //res.status(200).send({upload: true});
            res.status(200).send(editado);
        }else{
            res.status(400).send({erro: 'Usuário não é dono desta solução'});
        }
    }catch(err){
        console.log(err);
        res.status(400).send({erro: 'Erro ao tentar editar solução'});
    }
});

//TODO: buscar por todas as soluções do usuário
router.get('/', async (req, res) => {
    try{
        solucoes = await Solucao.find();

        return res.status(200).send({solucoes});
    }catch(err){
        return res.status(400).send({err: 'Erro ao buscar soluções'})
    }
});

//exportar rota para rota principal
module.exports = app => app.use('/solucaoAuth', router);