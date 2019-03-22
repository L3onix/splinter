const mongoose = require('../database/connection');

//definindo schema de avaliacao
const EvaluationSchema = new mongoose.Schema({
    like: {
        type: Boolean,
        required: true
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Evaluation = mongoose.model('Evaluation', EvaluationSchema);

module.exports = Evaluation;