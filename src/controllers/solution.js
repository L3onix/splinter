const express = require('express'),
    router = express.Router(),
    authMiddleware = require('../middlewares/auth'),
    Solution = require('../models/solution'),
    Question = require('../models/question'),
    questionHelper = require('../helpers/questionHelper'),
    solutionHelper = require('../helpers/solutionHelper');

/*
 * Descrição: rota para criar Solution utilizando um id de Question
 */
router.post('/', authMiddleware, async (req, res) => {
    const questionId = req.body.questionId;
    if(checkQuestionExists(questionId)){

        try {
            //buscando usuário
            const question = await Question.findById(questionId);
            //criando nova solução
            const solution = await Solution.create({ ...req.body, createBy: req.userId });
            //atualiza a questão com o id da solução
            await Question.updateOne({ _id: questionId }, { $push: { solutions: solution.id } });
            const teste = await Question.findById(questionId);

            return res.status(200).send({solution, teste});
        } catch (error) {
            console.log(error);
            return res.status(400).send({ error: 'Erro ao criar nova solução' });
        }
    }else{
        return res.status(400).send({error: 'ID de Question não existe'});
    }
});

/*
 * Descrição: rota que possibilita avalição (like, dislike) de uma Solution
 */
router.post('/:solutionId', authMiddleware, async (req, res) => {
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
});

/*
 * Descrição: rota para editar Solution utilizando um id de Solution
 */
router.put('/:solutionId', authMiddleware, async (req, res) => {
    const userId = req.userId;
    //console.log (userId);

    try {
        //bucando solução
        const solution = await Solution.findById(req.params.solutionId);

        //se o id da requisição é igual o id do criador
        if (solution.createBy == userId) {
            const edited = await Solution.findByIdAndUpdate(req.params.solutionId, req.body, { new: true });
            
            res.status(200).send({upload: true});
            //res.status(200).send(edited);
        } else {
            res.status(400).send({ error: 'Usuário não é dono desta solução' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: 'Erro ao tentar editar solução' });
    }
});

/*
 * Descrição: rota para deletar Solution utilizando um id de Solution
 * Retorno: pacote json com lista de Question filtradas por matter
 */
router.delete('/:solutionId', authMiddleware, async (req, res) => {
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
});

router.get('/:solutionId', async (req, res) => {
	if(req.headers.authorization){
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
});


// FUNÇÕES AUXILIARES
/*
 * Descrição: função que checa se questão existe
 * Retorno: boolean
 */
async function checkQuestionExists(questionId){
    try{
        const question = Question.findById(questionId);
        return true;
    }catch(error){
        return false;
    }
}

// EXPORTS
module.exports = app => {
    app.use('/solution', router);
};
