const express = require('express'),
    router = express.Router(),
    routerAuth = express.Router(),
    authMiddleware = require('../../middlewares/auth'),
    Solution = require('../../models/solution'),
    Question = require('../../models/question');

routerAuth.use(authMiddleware);


// ROTAS COM AUTENTICAÇÃO
/*
 * Descrição: rota para criar Solution utilizando um id de Question
 * Retorno: pacote json com lista de Question filtradas por matter
 */
routerAuth.post('/:questionId', async (req, res) => {
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

/*
 * Descrição: rota para editar Solution utilizando um id de Solution
 * Retorno: pacote json com lista de Question filtradas por matter
 */
routerAuth.put('/:solutionId', async (req, res) => {
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
routerAuth.delete('/:solutionId', async (req, res) => {
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

// ROTAS SEM AUTENTICAÇÃO
/*
 * Descrição: busca todas as Solution filtrando pelo usuário que criou usando um id de User
 * Retorno: pacote json com lista de Question filtradas por matter
 */
router.get('/:userId', async (req, res) => {
    // TODO: verificar se User existe e buscar sua lista de Solution
    try {
        solucoes = await Solucao.find();

        return res.status(200).send({ solucoes });
    } catch (err) {
        return res.status(400).send({ err: 'Erro ao buscar soluções' });
    }
});

/*
 * Descrição: rota para buscar Solution utilizando um id de Solution
 * Retorno: pacote json com lista de Question filtradas por matter
 */
router.get('/:solutionId', async (req, res) => {
    try{
        var solution = await Solution.findById(req.params.solutionId);
        //se existir solucao
        if(solution != null){
            solution.visualization ++;
            //console.log(solucao.visualizacoes);
            solution = await Solution.findByIdAndUpdate(req.params.solutionId, solution, {new: true});
            return res.status(200).send(solution);
        }else{
            return res.status(400).send({error: 'Solução não encontrada'});
        }

    }catch(error){
        console.log(error);
        return res.status(400).send({error: 'Erro ao buscar solução'});
    }
    
});

/*
 * !!! USAR SOMENTE PARA TESTES !!!
 * Descrição: lista todas as Solution armazenadas no banco de dados
 * Retorno: objeto json com uma lista com todos as Solution
 */
router.get('/', async (req, res) => {
    try{
        var solution = await Solution.find();
    }catch(error){
        console.log(error);
        return res.status(400).send({error: 'Erro ao buscar soluções'});
    }
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
    app.use('/solution', routerAuth);
    app.use('/solution', router);
};