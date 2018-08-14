//imports
const express = require('express'),
    router = express.Router(),
    authMiddleware = require('../../middlewares/auth'),
    Avaliacao = require('../../models/avaliacao'),
    Solucao = require('../../models/solucao');

router.use(authMiddleware);

//TODO: organizar rotas para fazer avaliação de Solucao
//TODO: fazer verificação para editar a avaliação se o usuário já tiver avaliado antes

//rota para criar Avaliacao
router.post('/:solucaoId', async (req, res) => {
    try {
        //criando avaliação no banco de dados
        const avaliacao = await Avaliacao.create({ ...req.body, criadoPor: req.userId });
        //atualizando solução adicionando o ID da avaliação
        await Solucao.update({_id: req.params.solucaoId}, {$push: {avaliacoes: avaliacao.id}});
        //retornando resultado da requisição
        res.status(200).send({status: 'ok'});
    } catch (err) {
        console.log(err);
        return res.status(400).send({ err: 'Erro ao avaliar solução' });
    }
});

//rota para editar Avaliacao
router.put('/:avaliacaoId', async (req, res) => {
    try{
        const avaliacao = await Avaliacao.findById(req.userId);

        if(avaliacao.criadoPor == req.userId){
            await Avaliacao.findByIdAndUpdate(req.params.solucaoId, {...req.body, criadoPor: req.userId},);
            res.status(200).send({status: 'ok'});
        }else{
            res.status(400).send({status: 'bad'});
        }
    }catch(err){
        console.log(err);
        return res.status(400).send({err: 'Erro ao editar avaliação'});
    }
})
//exports
module.exports = app => app.use('/avaliacaoAuth', router);