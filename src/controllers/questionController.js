const express = require('express'),
    router = express.Router(),
    authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);
//rota principal do controller
router.get('/', (req, res) => {
    res.status(200).send({ok: true});
});

//TODO: rota para efetuar inserção de questão
router.use('/questionAuth', require('./questionAuthController'));

module.exports = app => app.use('/questions', router);