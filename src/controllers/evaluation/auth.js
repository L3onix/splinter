//imports
const express = require('express'),
    router = express.Router(),
    authMiddleware = require('../../middlewares/auth'),
    Evaluation = require('../../models/evaluation'),
    Solution = require('../../models/solution');

router.use(authMiddleware);

//create Evaluation
router.post('/:solutionId', async (req, res) => {
    try {
        const evaluation = await Evaluation.create({ ...req.body, createBy: req.userId });

        await Solution.update({_id: req.params.solutionId}, {$push: {evaluations: evaluation.id}});

        res.status(200).send({create: true});
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'Erro ao avaliar solução' });
    }
});

//edit Evaluation
router.put('/:evaluationId', async (req, res) => {
    try{
        const evaluation = await Evaluation.findById(req.userId);

        if(evaluation.createBy == req.userId){
            await Evaluation.findByIdAndUpdate(req.params.evaluationId, {...req.body, createBy: req.userId},);
            res.status(200).send({edit: true});
        }else{
            res.status(400).send({edit: false});
        }
    }catch(error){
        console.log(error);
        return res.status(400).send({error: 'Erro ao editar avaliação'});
    }
});

//exports
module.exports = app => app.use('/evaluationAuth', router);