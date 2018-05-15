var debug = require('debug')('livro_nodejs:controller');
function StormtropperController(StormtropperModel){
    this.model = StormtropperModel;
}

StormtropperController.prototype.getAll = function(req, res, next){
    this.model.find({}, function(err, data){
        if(err){
            return next(err);
        }
        res.json(data);
    });
};

module.exports = function(StormtropperModel){
    return new StormtropperController(StormtropperModel);
};