const express = require('express'),
    router = express.Router(),
    authMiddleware = require('../middlewares/auth'),
    Questao = require('../models/questao'),
    Comentario = require('../models/comentario');

router.use(authMiddleware);

//rota para criar comentario
router.post('/:questaoId', async(req, res) => {
    try{
        //criando comentario no banco de dados
        const comentario = await Comentario.create({...req.body, createBy: req.userId});
        //atualizando questao com comentario
        await Questao.findByIdAndUpdate(req.params.questaoId, {$push: {comentarios: comentario._id}});

        //response
        res.status(200).send({upload: true});
    }catch(err){
        console.log(err);
        return res.status(400).send({error: 'Erro ao criar comentario'});
    }
});

//TODO: checar se o dono da requisição é o dono do comentário
//rota para editar comentario
router.put('/:comentarioId', async(req, res) => {
    try{
        const comentario = await Comentario.findByIdAndUpdate(req.params.comentarioId, req.body, {new: true});

        res.status(200).send({upload:true});

    }catch(err){
        console.log(err);
        return res.status(400).send({error: 'Erro ao editar comentario'});
    }
});

//TODO: checar se o dono da req é o dono do comentario
//TODO: disponibilizar para professor excluir o comentário
//TODO: atualizar lista de comentários armazenados na questão
router.delete('/:comentarioId', async(req, res) => {
    try{
        await Comentario.findByIdAndRemove(req.params.comentarioId);
        res.status(200).send({delete: true});
    }catch(err){
        console.log(err);
        return res.status(400).send({error: 'Erro ao deletar comentario'});
    }
})

//export de rotas
module.exports = app => app.use('/comentarioAuth', router);