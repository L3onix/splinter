const mongoose = require('../database/connection');

//definindo schema de solucao
const SolutionSchema = new mongoose.Schema({
    text:{
        type: String
    },
    images: [{
        type: String
    }],
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    visualization: {
        type: Number,
        default: 0
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }]
});

//definindo que 'Solucao' segue o model 'SolucaoSchema'
const Solution = mongoose.model('Solution', SolutionSchema);

module.exports = Solution;