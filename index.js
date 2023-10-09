const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const auth = require('./src/routes/auth')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/auth', auth)

app.listen(port, () => {
    console.log('running on port 3000')
})