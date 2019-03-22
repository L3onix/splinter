const mongoose = require('../database/connection');

//definindo schema de Comentario
const CommentSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true
    },
    createBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createAt:{
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;