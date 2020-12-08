const Question = require('../models/question'),
    ObjectId = require('mongoose').Types.ObjectId

module.exports = class questionRepository {
    getQuestions(filters, id){
        const skip = filters.skip
        delete filters.skip
        const limit = filters.limit
        delete filters.limit

        //caso tenha id, o id é adicionado como filtro
        id ? filters._id = id : null

        return Question.find(filters).limit(limit).skip(skip).sort({createAt: -1})
    }
    createNewQuestion(question, userId){
        return Question.create({...question, createBy: userId})
    }
    updateQuestionById(question, id, userId){
        const query = {_id: id, createBy: new ObjectId(userId)}
        return Question.findOneAndUpdate(query, question)
    }
    deleteQuestionById(id, userId){
        const query = {_id: id, createBy: new ObjectId(userId)}
        return Question.findOneAndDelete(query)
    }
}