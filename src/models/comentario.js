const mongoose = require('../database/connection');

//definindo schema de Comentario
const ComentarioSchema = new mongoose.Schema({
    descricao:{
        type: String,
        required: true
    },
    criadoPor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    criadoEm:{
        type: Date,
        default: Date.now
    }
});

const Comentario = mongoose.model('Comentario', ComentarioSchema);

module.exports = Comentario;