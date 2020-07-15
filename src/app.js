const express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//corrigindo problema de cross origin
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//teste de API
app.get('/', (req, res) => {
    console.log('>>> Requisição a porta 9000 funcionando <<<');
    res.status(200).send({status: "ok"});
});


//import de controllers
require('./controllers/authController')(app);
require('./controllers/question')(app);
require('./controllers/comment')(app);
require('./controllers/solution')(app);

//inicialização do servidor na porta 9000
var server = app.listen(process.env.PORT || 9000, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('API escutando porta '+port);
});

module.exports = app