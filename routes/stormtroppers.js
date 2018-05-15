var express = require('express'),
    router = express.Router();

var mongo = require('../db/mongo');
var StormtropperModel = require('../models/StormtropperModel')(mongo);
var StormtropperController = require('../controllers/StormtropperController')(StormtropperModel);

router.get('/', StormtropperController.getAll.bind(StormtropperController));

module.exports = router;