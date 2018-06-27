const mongoose = require('../database/connection');

//definindo schema de questao
const QuestaoSchema = new mongoose.Schema({
    codigo:{
        type: String,
        required: true,
        lowercase: true
    },
    enunciado:{
        type: String
    },
    alternativas:[{
        type: String
    }],
    descritor:{
        type: String,
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
    criador:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    data:{
        type: Date,
        default: Date.now
    }
});

//criando objeto de banco de dados que segue o modelo QuestaoSchema
const Questao = mongoose.model('Questao', QuestaoSchema);

//exportando objeto Questao
module.exports = Questao;