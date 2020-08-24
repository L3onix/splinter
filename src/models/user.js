const mongoose = require('../database/connection'),
    bcryptjs = require('bcryptjs');

//definindo schema de user
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    flag: {
        type: String,
        default: "student"
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

//gerando hash criptográfica de senha do usuário
UserSchema.pre('save', async function(next){
    const hash = await bcryptjs.hash(this.password, 10);
    this.password = hash;

    next();
});

//definindo que 'User' segue o modelo 'UserSchema'
const User = mongoose.model('User', UserSchema);

module.exports = User;
