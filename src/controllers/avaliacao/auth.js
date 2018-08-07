//rota para avaliação LIKE || DISLIKE
router.post('/avaliacao/:solucaoId', async (req, res) => {
    try {
        //criando avaliação no banco de dados
        const avaliacao = await Avaliacao.create({ ...req.body, createBy: req.userId });
        //console.log(avaliacao.id);
        //atualizando solução adicionando o ID da avaliação
        await Solucao.update({_id: req.params.solucaoId}, {$push: {avaliacoes: avaliacao.id}});
        //solucao = await Solucao.findByIdAndUpdate(req.params.solucaoId, { $push: { avaliacoes: avaliacao.id } }, { new: true });
        //retornando resultado da requisição
        res.status(200).send({upload: true});
    } catch (err) {
        console.log(err);
        return res.status(400).send({ err: 'Erro ao avaliar solução' });
    }
});