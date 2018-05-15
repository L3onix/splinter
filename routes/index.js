var express = require('express'),
    router = express.Router();

router.get('/',function(req, res){
    res.status(201);
    res.send('Hello Leonix')
});

//stormtroppers
router.use('/stormtropper', require('./stormtroppers'));

module.exports = router;