var express = require('express'),
    router = express.Router();

var mongoose = require('../db/mongoose');
var UserModel = require('../models/UserModel')(mongoose);
var UserController = require('../controllers/UserController')(UserModel);

router.get('/', UserController.getAll.bind(UserController));
router.get('/:_id', UserController.getById.bind(UserController));
router.get('/', UserController.create.bind(UserController));
router.get('/:_id', UserController.update.bind(UserController));
router.get('/:_id', UserController.remove.bind(UserController));

module.exports = router;