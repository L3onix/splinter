const authMiddleware = require('../middlewares/auth'),
    Solution = require('../models/solution'),
    Question = require('../models/question'),
    SolutionRepository = require('../repositorys/solutionRepository')
    ObjectId = require('mongoose').Types.ObjectId

module.exports = class SolutionController {
    async list(req, res){
        try{
            if(req.headers.authorization){
                console.log('passou')
                authMiddleware(req, res, () => {})
            }
            const solution = await new SolutionRepository().getSolutionById(req.params.solutionId, req.userId)
            res.status(200).send(solution)
        }catch(err){
            console.log(err)
            res.status(400).send({err: 'Erro ao carregar solução'})
        }
    }
    async create(req, res){
        try{
            const solution = await new SolutionRepository().createNewSolution(req.body, req.userId, req.body.questionId)
            res.status(200).send(solution)
        }catch(err){
            console.log(err)
            return res.status(400).send({error: err.message});
        }
    }
    async update(req, res){
        try {
            const solution = await new SolutionRepository().updateSolutionById(req.body, req.params.solutionId, req.userId)
            res.status(200).send(solution)
        } catch (error) {
            console.log(error);
            res.status(400).send({ error: 'Erro ao tentar editar solução' });
        }

    }
    async delete(req, res){
        try {
            //const solution = await Solution.findById(req.params.solutionId);
            //if (solution.createBy == req.userId) {
            //    await Solution.findByIdAndRemove(req.params.solutionId);
            //    res.status(200).send({ delete: true });
            //} else {
            //    res.status(400).send({ error: 'Usuário não é dono da solução' });
            //}
            const solution = await new SolutionRepository().deleteSolutionById(req.params.solutionId, req.userId)
            res.status(200).send(solution)
        } catch (error) {
            console.log(error);
            return res.status(400).send({ error: 'Erro ao deletar solução' });
        }
    }
    async toEvaluate(req, res){
        const userId = req.userId
        const solutionId = req.params.solutionId
        const solution = await solutionHelper.checkSolutionExists(solutionId)
        if(solution){
            try{
                if(req.body.evaluate == 0){ // se for dislike
                    if(solution.likes.includes(userId)){
                        await Solution.updateOne({_id: solutionId}, {$pull: {likes: userId}})
                    }if(!solution.dislikes.includes(userId)){
                        await Solution.updateOne({_id: solutionId}, {$push: {dislikes: userId}})
                    }
                }else if(req.body.evaluate == 1){   // se for like
                    if(solution.dislikes.includes(userId)){
                        await Solution.updateOne({_id: solutionId}, {$pull: {dislikes: userId}})
                    }if(!solution.likes.includes(userId)){
                        await Solution.updateOne({_id: solutionId}, {$push: {likes: userId}})
                    }
                }else if(req.body.evaluate == null){    // se for remover avaliação
                    if(solution.dislikes.includes(userId)){
                        await Solution.updateOne({_id: solutionId}, {$pull: {dislikes: userId}})
                    }else if(solution.likes.includes(userId)){
                        await Solution.updateOne({_id: solutionId}, {$pull: {likes: userId}})
                    }
                }else{  // qualquer outra entrada
                    return res.status(400).send()
                }
                return res.status(200).send(await Solution.findById(solutionId))
            }catch(error){
                console.log(error)
                return res.status(400).send({error: 'Erro ao registrar avaliação'})
            }
        }
        return res.status(400).send()
    }
}
