const express = require('express'),
    router = express.Router(),
    Comment = require('../../models/comment');

//rota para buscar todos os comentários
router.get('/', async(req, res) => {
    try{
        const comments = await Comments.find();
        res.status(200).send(comments);
    }catch(error){
        console.log(error);
        res.status(400).send({error: 'Erro ao buscar comentários'});
    }
});

// TODO: buscar comentários por questão

module.exports = app => app.use('/comment', router);