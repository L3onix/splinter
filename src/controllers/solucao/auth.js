const express = require('express'),
    router = express.Router(),
    authMiddleware = require('../../middlewares/auth'),
    Solucao = require('../../models/solucao'),
    Questao = require('../../models/questao');

router.use(authMiddleware);

//rota para a criação de solucao
router.post('/:questaoId', async (req, res) => {
    //res.send({ok: true});

    try {
        //buscando usuário
        const questao = await Questao.findById(req.params.questaoId);
        //criando nova solução
        const solucao = await Solucao.create({ ...req.body, criadoPor: req.userId });
        //atualiza a questão com o id da solução
        await Questao.update({ _id: req.params.questaoId }, { $push: { solucoes: solucao.id } });
        //console.log(solucao.id);

        return res.status(200).send({ upload: true });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao criar nova solução' });
    }
});

router.put('/:solucaoId', async (req, res) => {
    const userId = req.userId;
    //console.log (userId);

    try {
        //bucando solução
        const solucao = await Solucao.findById(req.params.solucaoId);

        //se o id da requisição é igual o id do criador
        if (solucao.createBy == req.userId) {
            const editado = await Solucao.findByIdAndUpdate(req.params.solucaoId, req.body, { new: true });
            //res.status(200).send({upload: true});
            res.status(200).send(editado);
        } else {
            res.status(400).send({ erro: 'Usuário não é dono desta solução' });
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({ erro: 'Erro ao tentar editar solução' });
    }
});

//TODO: buscar por todas as soluções do usuário
router.get('/', async (req, res) => {
    try {
        solucoes = await Solucao.find();

        return res.status(200).send({ solucoes });
    } catch (err) {
        return res.status(400).send({ err: 'Erro ao buscar soluções' });
    }
});

//rota para deletar solução
router.delete('/:solucaoId', async (req, res) => {
    try {
        const solucao = await Solucao.findById(req.params.solucaoId);
        if (solucao.createBy == req.userId) {
            await Solucao.findByIdAndRemove(req.params.solucaoId);
            res.status(200).send({ delete: true });
        } else {
            res.status(400).send({ err: 'Usuário não é dono da solução' });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send({ err: 'Erro ao deletar solução' });
    }
});

//exportar rota para rota principal
module.exports = app => app.use('/solucaoAuth', router);