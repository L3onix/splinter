const mongoose = require('../database/connection'),
    bcryptjs = require('bcryptjs');

//definindo schema de user
const UserSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    senha: {
        type: String,
        required: true,
        select: false
    },
    professor: {
        type: Boolean,
        default: false
    },
    criadoEm: {
        type: Date,
        default: Date.now
    }
});

//gerando hash criptográfica de senha do usuário
UserSchema.pre('save', async function(next){
    const hash = await bcryptjs.hash(this.senha, 10);
    this.senha = hash;

    next();
});

//definindo que 'User' segue o modelo 'UserSchema'
const User = mongoose.model('User', UserSchema);

module.exports = User;