const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const auth = require('./routes/auth')
const user = require('./routes/user')
const dbConnection = require('./helpers/dbConnection')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

dbConnection()

app.get('/', async (req, res) => {
    res.send('hello world')
})

app.use('/auth', auth)
app.use('/user', user)

module.exports = app