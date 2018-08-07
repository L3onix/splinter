const express = require('express'),
    router = express.Router(),
    Solucao = require('../../models/solucao');
    
//rota para buscar solução
router.get('/:solucaoId', async (req, res) => {
    try{
        var solucao = await Solucao.findById(req.params.solucaoId);
        //se existir solucao
        if(solucao != null){
            solucao.visualizacoes ++;
            //console.log(solucao.visualizacoes);
            solucao = await Solucao.findByIdAndUpdate(req.params.solucaoId, solucao, {new: true});
            return res.status(200).send(solucao);
        }else{
            return res.status(400).send({err: 'Solução não encontrada'});
        }

    }catch(err){
        console.log(err);
        return res.status(400).send({err: 'Erro ao buscar solução'});
    }
    
});

//TODO: se necessário fazer busca por questão aqui
//buscar por todas as soluções por questão
router.get('/', async (req, res) => {
    try{
        var solucoes = await Solucao.find();
    }catch(err){
        console.log(err);
        return res.status(400).send({err: 'Erro ao buscar soluções'});
    }
});

//exportar rota para rota principal
module.exports = app => app.use('/solucao', router);