const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const auth = require('./src/routes/auth')
const user = require('./src/routes/user')
const dbConnection = require('./src/helpers/dbConnection')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

dbConnection()

app.get('/', async (req, res) => {
    res.send('hello world')
})

app.use('/auth', auth)
app.use('/user', user)

module.exports = app