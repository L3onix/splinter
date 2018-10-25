const mongoose = require('mongoose');

//conexão com banco de dados 'webs-pev'
mongoose.connect('mongodb://mestreninja:default1@naboo.mongodb.umbler.com:46941/webs-pev', {useNewUrlParser: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;