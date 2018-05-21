const express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.status(200).send({"status": "ok"});
});

require('./controllers/authController')(app);

module.exports = app;