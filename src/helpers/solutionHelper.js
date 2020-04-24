const Solution = require('../models/solution')

module.exports = {
    async checkSolutionExists(solutionId){
        try{
            const solution = await Solution.findById(solutionId)
            return solution
        }catch(error){
            return false
        }
    },
}