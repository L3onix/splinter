const mongoose = require('mongoose')

const username = 'root'
const passwd = 'default1'
const cluster = '127.0.0.1:27017'
const dbname = 'test'
const mongoUrl = `mongodb://${username}:${passwd}@${cluster}/`

const db = mongoose.connection

const conn = async () => {
    try {
        const db = await mongoose.connect(mongoUrl, { useNewUrlParser: true })
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = conn