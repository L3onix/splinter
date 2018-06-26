const express = require('express'),
    router = express.Router(),
    Comentario = require('../models/comentario');

//rota para buscar todos os comentarios
router.get('/', async(req, res) => {
    try{
        const comentarios = await Comentario.find();

        res.status(200).send(comentarios);
    }catch(err){
        console.log(err);
        res.status(400).send({err: 'Erro ao buscar comentarios'});
    }
});

module.exports = app => app.use('/comentario', router);