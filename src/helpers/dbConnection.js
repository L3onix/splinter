const mongoose = require('mongoose')
const password = 'LkCclPMSmbutCQqf'
const mongoUrl = `mongodb+srv://l3onix:${password}@splinter.ialak46.mongodb.net/?retryWrites=true&w=majority`

const conn = async () => {
    try {
        const db = await mongoose.connect(mongoUrl, { useNewUrlParser: true })
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = conn