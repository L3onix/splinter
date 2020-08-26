const User = require('./user.js')
const mongoose = require('../database/connection');

//definindo schema de questao
const QuestionSchema = new mongoose.Schema({
    font:{
        type: String,
        required: false,
        lowercase: true
    },
    statement:{
        type: String,
        required: false
    },
    image:{
        type: String,
        required: false
    },
    alternatives:[{
        type: String,
        required: false
    }],
    answer:{
        type: String,
        required: false
    },
    matter:{
        type: String,
        lowercase: true,
        required: true
    },
    tags:[{
        type: String,
        lowercase: true
    }],
    solutions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Solution'
    }],
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
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

// checando se o usuário tem a flag 'teacher'
QuestionSchema.pre('save', async function(next){
    await checkFlag(this) ? next() : next(new Error('Usuário não tem autorização para este tipo de operação!'))
})

// checando se o usuário foi quem criou a Question
QuestionSchema.pre('updateOne', async function(next) {
	if(!await checkFlag(this._update)){
		next(new Error('Usuário não tem autorização para este tipo de operação!'))
	}

})

async function checkFlag(question) {
    const user = await User.findById(question.createBy)
    return(user.flag == 'teacher')
}
async function checkCreator(question) {

}

//criando objeto de banco de dados que segue o modelo QuestaoSchema
const Question = mongoose.model('Question', QuestionSchema);

//exportando objeto Questao
module.exports = Question;
