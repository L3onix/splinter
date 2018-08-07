const mongoose = require('../database/connection');

//definindo schema de solucao
const SolucaoSchema = new mongoose.Schema({
    descricao:{
        type: String,
        required: true
    },
    alternativa:{
        type: String,
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
    },
    visualizacoes: {
        type: Number,
        default: 0
    },
    avaliacoes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Avaliacao'
    }]
});

//definindo que 'Solucao' segue o model 'SolucaoSchema'
const Solucao = mongoose.model('Solucao', SolucaoSchema);

module.exports = Solucao;