var express  = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

//conexão mongoose
mongoose.connect('mongodb://localhost/webs-pev');
var db = mongoose.connection;

app.get('/', function(req, res){
    res.send('Hello World');
});

app.listen(3000);
console.log('Server escutando porta 3000');