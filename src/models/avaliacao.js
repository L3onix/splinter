const mongoose = require('../database/connection');

//definindo schema de avaliacao
const AvaliacaoSchema = new mongoose.Schema({
    like: {
        type: Boolean,
        required: true
    },
    criadoPor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    criadoEm: {
        type: Date,
        default: Date.now
    }
});

const Avaliacao = mongoose.model('Avaliacao', AvaliacaoSchema);

module.exports = Avaliacao;