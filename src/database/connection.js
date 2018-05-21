const mongoose = require('mongoose');

//conexão com banco de dados 'webs-pev'
mongoose.connect('mongodb://localhost/webs-pev');
mongoose.Promise = global.Promise;

module.exports = mongoose;