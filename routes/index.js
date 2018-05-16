var express = require('express'),
    router = express.Router();

router.get('/', function(req, res){
    res.status(201);
    res.send('Hello Leonix');
});

//Users
router.use('/users', require('./users'));

module.exports = router;