const authMiddleware = require('../middlewares/auth'),
    Solution = require('../models/solution'),
    Question = require('../models/question'),
    ObjectId = require('mongoose').Types.ObjectId

module.exports = class SolutionController {
    async list(req, res){
        if(req.headers.authorization){  // retorna uma Solution com a avaliação do usuário
            authMiddleware(req, res, ()=>{})
            const userId = req.userId

            Solution.findById(req.params.solutionId, (err, solution) => {
                if(err) return res.status(400).send(err)

                // formatando solution
                let userEvaluate = ''
                if(solution.likes.includes(userId)){
                    userEvaluate = 'like'
                }else if(solution.dislikes.includes(userId)){
                    userEvaluate = 'dislike'
                }
                solution._doc.likes = solution.likes.length
                solution._doc.dislikes = solution.dislikes.length
                
                res.status(200).send({solution, "userEvaluate": userEvaluate})
            })
        }
        Solution.findById(req.params.solutionId, (err, solution) => {
            if(err) return res.status(400).send(err)

            res.status(200).send({solution})
        })
    }
    async create(req, res){
        try{
            const question =  await Question.findById(req.body.questionId)
            if(typeof question != undefined){
                const solution = await Solution.create({ ...req.body, createBy: req.userId })

                await Question.findByIdAndUpdate(req.body.questionId, {$push: {solutions: new ObjectId(solution._id)}})
                res.status(201).send(solution)
            }else{
                throw "ID de Question não existe!"
            }
        }catch(err){
            console.log(err)
            return res.status(400).send({error: err.message});
        }
    }
    async update(req, res){
        const userId = req.userId;
        try {
            const solution = await Solution.findById(req.params.solutionId);
            if (solution.createBy == userId) {
                const edited = await Solution.findByIdAndUpdate(req.params.solutionId, req.body, { new: true });
                
                res.status(200).send({upload: true});
            } else {
                res.status(400).send({ error: 'Usuário não é dono desta solução' });
            }
        } catch (error) {
            console.log(error);
            res.status(400).send({ error: 'Erro ao tentar editar solução' });
        }

    }
    async delete(req, res){
        try {
            const solution = await Solution.findById(req.params.solutionId);
            if (solution.createBy == req.userId) {
                await Solution.findByIdAndRemove(req.params.solutionId);
                res.status(200).send({ delete: true });
            } else {
                res.status(400).send({ error: 'Usuário não é dono da solução' });
            }
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
