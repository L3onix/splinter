const mongoose = require('../database/connection');

//definindo schema de question
const QuestionSchema = new mongoose.Schema({
    codigo:{
        type: String,
        required: true,
        lowercase: true
    },
    descricao:{
        type: String,
        required: true
    },
    alternativa:[{
        type: String
    }],
    eixo: {
        type: String,
        required: true,
        lowercase: true
    },
    solucoes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Solucao'
    }],
    comentarios:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comentario'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

//definindo que 'Question' segue o modelo 'QuestionSchema'
const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;