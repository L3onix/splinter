const express = require('express'),
    router = express.Router(),
    routerAuth = express.Router(),
    authMiddleware = require('../middlewares/auth'),
    Question = require('../models/question'),
    Comment = require('../models/comment');

routerAuth.use(authMiddleware);

//ROTAS COM AUTENTICAÇÃO
/*
 * Descrição: rota para criar um Comment utilizando um id de Question
 * Retorno: retorna apenas uma confirmação de que a rota foi executada {create: true}
 */
routerAuth.post('/:questionId', async(req, res) => {
    try{
        //criando comentario no banco de dados
        const comment = await Comment.create({...req.body, createBy: req.userId});
        //atualizando questao com comentario
        await Question.findByIdAndUpdate(req.params.questionId, {$push: {comments: comment._id}});

        //response
        res.status(200).send({create: true});
    }catch(error){
        console.log(error);
        return res.status(400).send({error: 'Erro ao criar comentario'});
    }
});

/*
 * Descrição: rota para editar Comment utilizando um id de Comment
 * Retorno: retorna apenas uma confirmação de que a rota foi executada {upload: true}
 * TODO: checar se o dono da requisição é o dono do comentário
 */
routerAuth.put('/:commentId', async(req, res) => {
    try{
        const comment = await Comment.findByIdAndUpdate(req.params.commentId, req.body, {new: true});

        res.status(200).send({upload:true});

    }catch(error){
        console.log(error);
        return res.status(400).send({error: 'Erro ao editar comentario'});
    }
});

/*
 * Descrição: rota para deletar Comment utilizando um id de Comment
 * Retorno: retorna apenas uma confirmação de que a rota foi executada {delete: true}
 * TODO: checar se o dono da req é o dono do comentario
 * TODO: disponibilizar para professor excluir o comentário
 * TODO: atualizar lista de comentários armazenados na questão
 */
routerAuth.delete('/:commentId', async(req, res) => {
    try{
        await Comment.findByIdAndRemove(req.params.commentId);
        res.status(200).send({delete: true});
    }catch(error){
        console.log(error);
        return res.status(400).send({error: 'Erro ao deletar comentario'});
    }
});

//ROTAS SEM AUTENTICAÇÃO
/* !!!NÃO UTILIZAR!!!
 * Descrição: rota para buscar todos os Comment
 * Retorno: retorna um objeto json com uma lista de Comment
 */
router.get('/', async(req, res) => {
    try{
        const comments = await Comment.find();
        res.status(200).send(comments);
    }catch(error){
        console.log(error);
        res.status(400).send({error: 'Erro ao buscar comentários'});
    }
});

// TODO: buscar comentários por questão

//export de rotas
module.exports = app => {
    app.use('/comment', routerAuth);
    app.use('/comment', router);
};