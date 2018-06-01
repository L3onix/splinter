const mongoose = require('../database/connection');

//definindo schema de question
const QuestionSchema = new mongoose.Schema({
    _id:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    descricao:{
        require: true
    },
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

//definindo que 'Question' segue o modelo 'QuestionSchema'
const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;