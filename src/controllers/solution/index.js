const express = require('express'),
    router = express.Router(),
    Solution = require('../../models/solution');
    
//rota para buscar solução
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

//busca todas as soluções
// !!! USAR SOMENTE PARA TESTES !!!
router.get('/', async (req, res) => {
    try{
        var solution = await Solution.find();
    }catch(error){
        console.log(error);
        return res.status(400).send({error: 'Erro ao buscar soluções'});
    }
});

//exportar rota para rota principal
module.exports = app => app.use('/solution', router);