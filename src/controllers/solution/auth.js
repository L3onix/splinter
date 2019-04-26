const express = require('express'),
    router = express.Router(),
    authMiddleware = require('../../middlewares/auth'),
    Solution = require('../../models/solution'),
    Question = require('../../models/question');

router.use(authMiddleware);

//TODO: buscar por todas as soluções do usuário
/*
router.get('/', async (req, res) => {
    try {
        solucoes = await Solucao.find();

        return res.status(200).send({ solucoes });
    } catch (err) {
        return res.status(400).send({ err: 'Erro ao buscar soluções' });
    }
});
*/

//create Solution
router.post('/:questionId', async (req, res) => {
    if(checkQuestionExists(req.params.questionId)){
        try {
            //buscando usuário
            const question = await Question.findById(req.params.questionId);
            //criando nova solução
            const solution = await Solution.create({ ...req.body, createBy: req.userId });
            //atualiza a questão com o id da solução
            await Question.update({ _id: req.params.questionId }, { $push: { solutions: solution.id } });
            //console.log(solucao.id);

            return res.status(200).send({ create: true });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ error: 'Erro ao criar nova solução' });
        }
    }else{
        return res.status(400).send({error: 'ID de Question não existe'});
    }
});

//update Solution
router.put('/:solutionId', async (req, res) => {
    const userId = req.userId;
    //console.log (userId);

    try {
        //bucando solução
        const solution = await Solution.findById(req.params.solutionId);

        //se o id da requisição é igual o id do criador
        if (solution.createBy == req.userId) {
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

//rota para deletar solução
router.delete('/:solutionId', async (req, res) => {
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

//função que checa se questão existe
async function checkQuestionExists(questionId){
    try{
        const question = Question.findById(questionId);
        return true
    }catch(error){
        return false
    }
}

//exportar rota para rota principal
module.exports = app => app.use('/solutionAuth', router);