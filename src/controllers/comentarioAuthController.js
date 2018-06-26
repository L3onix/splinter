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

//export de rotas
module.exports = app => app.use('/comentarioAuth', router);