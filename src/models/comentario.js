const mongoose = require('../database/connection');

//definindo schema de comentario
const ComentarioSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true
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

const Comentario = mongoose.model('Comentario', ComentarioSchema);

module.exports = Comentario;