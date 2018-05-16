var debug = require('debug')('webs-pev:controller'),
    model;

function UserController(UserModel){
    this.model = UserModel;
}

UserController.prototype.getAll = function(req, res, next){
    this.model.find({}, function(err, data){
        if(err){
            return next(err);
        }
        res.json(data);
    });
};
UserController.prototype.getById = function(req, res, next){
    var _id = req.params._id;
    this.model.findOne(_id, function(err, data){
        if(err){
            return next(err);
        }
        res.json(data);
    });
};
UserController.prototype.create = function(req, res, next){
    var body = request.body;
    this.model.create(body, function(err, data){
        if(err){
            return next(err);
        }
        res.json(data);
    });
};
UserController.prototype.update = function(req, res, next){
    var _id = req.params._id,
        body = req.body;
    this.model.update(_id, body, function(err, data){
        if(err){
            return next(err);
        };
        res.json(data);
    });
};
UserController.prototype.remove = function(req, res, next){
    var _id = req.params._id;
    this.model.remove(_id, function(err, data){
        if(err){
            return next(err);
        }
        res.json(data);
    });
};

module.exports = function(UserModel){
    return new UserController(UserModel);
}

module.exports = function(UserModel){
    return new UserController(UserModel);
};