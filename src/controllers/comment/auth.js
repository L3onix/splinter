const express = require('express'),
    router = express.Router(),
    authMiddleware = require('../../middlewares/auth'),
    Question = require('../../models/question'),
    Comment = require('../../models/comment');

router.use(authMiddleware);

//rota para criar comentario
router.post('/:questionId', async(req, res) => {
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

//TODO: checar se o dono da requisição é o dono do comentário
//rota para editar comentario
router.put('/:commentId', async(req, res) => {
    try{
        const comment = await Comment.findByIdAndUpdate(req.params.commentId, req.body, {new: true});

        res.status(200).send({upload:true});

    }catch(error){
        console.log(error);
        return res.status(400).send({error: 'Erro ao editar comentario'});
    }
});

//TODO: checar se o dono da req é o dono do comentario
//TODO: disponibilizar para professor excluir o comentário
//TODO: atualizar lista de comentários armazenados na questão
router.delete('/:commentId', async(req, res) => {
    try{
        await Comment.findByIdAndRemove(req.params.commentId);
        res.status(200).send({delete: true});
    }catch(error){
        console.log(error);
        return res.status(400).send({error: 'Erro ao deletar comentario'});
    }
})

//export de rotas
module.exports = app => app.use('/commentAuth', router);