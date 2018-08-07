const mongoose = require('../database/connection');

//definindo schema de avaliacao
const AvaliacaoSchema = new mongoose.Schema({
    like: {
        type: Boolean
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

const Avaliacao = mongoose.model('Avaliacao', AvaliacaoSchema);

module.exports = Avaliacao;