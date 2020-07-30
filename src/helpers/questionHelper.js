const Question = require('../models/question')

module.exports = {
    async checkQuestionExists(questionId){
        try{
            const question = await Question.findById(questionId)
            if (question) return true
            return false
        }catch(error){
            return false
        }
    }
}