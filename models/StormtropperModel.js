var mongo;

function StormtropperModel(mongo){
    this.mongo = mongo;
}

StormtropperModel.prototype.find = function(query, callback){
    this.mongo.collection('stormtroppers').find(querry, callback);
};

module.exports = function(mongo){
    return new StormtropperModel(mongo);
};