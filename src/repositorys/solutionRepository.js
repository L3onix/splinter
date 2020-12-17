const Solution = require('../models/solution'),
    QuestionRepository = require('../repositorys/questionRepository')

module.exports = class SolutionRepository {
    getSolutionById(id, userId){
        const solution = Solution.findById(id)

        //TODO: adicionar condicional para chamar função que retornar o userEvaluate
        
        return solution
    }
    async createNewSolution(solution, userId, questionId){
        if(await new QuestionRepository().verifyQuestionExists(questionId)){
            const savedSolution = await Solution.create({...solution, createBy: userId})
            await new QuestionRepository().addSolutionToQuestion(questionId, savedSolution._id)
            return savedSolution
        }
        throw TypeError("Questão não existe!")
    }
}