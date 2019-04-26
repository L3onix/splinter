const express = require('express'),
    router = express.Router(),
    authMiddleware = require('../../middlewares/auth'),
    Question = require('../../models/question'),
    User = require('../../models/user');

router.use(authMiddleware);

//rota para criar Questao
router.post('/', async (req, res) => {
    try{
        //checando se o usuário é professor
        if(await checkFlag(req.userId)){
            //criando Questao
            await Question.create({...req.body, createBy: req.userId});
            res.status(200).send({status: 'Sucesso ao criar questão'});
        }else{
            res.status(400).send({error: 'Usuário não é professor'});
        }
    }catch(error){
        console.log(error);
        res.status(400).send({error: 'Erro ao criar questão'});
    }
});

//rota para editar Questao
router.put('/:questionId', async(req, res) => {
    try{
        //checando se o usuário é professor
        if(await checkCreator(req.userId, req.params.questionId)){
            //editando Questao
            await Question.findByIdAndUpdate(req.params.questionId, req.body);
            res.status(200).send({status: 'Sucesso ao editar questão'});
        }else{
            res.status(400).send({error: 'Usuário não controla esta questão'});
        }
    }catch(error){
        console.log(error);
        res.status(400).send({error: 'Erro ao editar questão'});
    }
});

//rota para deletar Questao
router.delete('/:questionId', async(req, res) => {
    try{
        //checando se o usuário é professor
        if(await checkCreator(req.userId, req.params.questionId)){
            //deletando Questao
            await Question.findByIdAndRemove(req.params.questionId);
            res.status(200).send({status: 'Sucesso ao deletar questão'});
        }else{
            res.status(400).send({error: 'Usuário não é professor'});
        }
    }catch(error){
        console.log(error);
        res.status(400).send({error: 'Erro ao deletar questão'});
    }
});

//função que verifica se a userId é um professor
async function checkFlag(userId){
    const user = await User.findById(userId);
    if(user.flag == 'teacher'){
        return true;
    }else{
        return false;
    }
}

//função que verifica se o userId da requisição é o mesmo do createBy da Question
async function checkCreator(userId, questionId){
    const question = await Question.findById(questionId);
    if(question.createBy == userId){
        return true
    }else{
        return false
    }
}

//exports
module.exports = app => app.use('/questionAuth', router);