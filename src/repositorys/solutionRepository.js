const Solution = require('../models/solution'),
    QuestionRepository = require('../repositorys/questionRepository')

module.exports = class SolutionRepository {
    async getSolutionById(id, userId){
        const solution = await Solution.findById(id)
        if(userId){
            solution._doc['userEvaluate'] = this.loadUserEvaluate(solution, userId)
        }

        return this.loadLengthEvaluates(solution)
    }
    async createNewSolution(solution, userId, questionId){
        if(await new QuestionRepository().verifyQuestionExists(questionId)){
            const savedSolution = await Solution.create({...solution, createBy: userId})
            await new QuestionRepository().addSolutionToQuestion(questionId, savedSolution._id)
            return savedSolution
        }
        throw TypeError("Questão não existe!")
    }
    updateSolutionById(solution, id, userId){
        const query = {_id: id, createBy: new ObjectId(userId)}
        return Solution.findByIdAndUpdate(query, solution)
    }
    deleteSolutionById(id, userId){
        const query = {_id: id, createBy: new ObjectId(userId)}
        
        return Solution.findOneAndDelete(query)
    }
    loadUserEvaluate(solution, userId){
        if(solution.likes.includes(userId)){
            return 'like'
        }else if(solution.dislikes.includes(userId)){
            return 'dislike'
        }
    }
    loadLengthEvaluates(solution){
        solution._doc.likes = solution.likes.length
        solution._doc.dislikes = solution.dislikes.length
        return solution
    }
}