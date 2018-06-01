const express = require('express'),
    router = express.Router(),
    authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get('/', (req, res) => {
    res.send({ok: true, user: req.userId});
});

module.exports = router;