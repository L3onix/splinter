const Question = require('../models/question')

module.exports = {
    async checkQuestionExists(questionId){
        try{
            const question = await Question.findById(questionId)
            return true
        }catch(error){
            return false
        }
    }
}