const express = require('express'),
    router = express.Router(),
    routerAuth = express.Router(),
    authMiddleware = require('../middlewares/auth'),
    Question = require('../models/question'),
    User = require('../models/user');

//adicionando middleware de autenticação ao routerAuth
routerAuth.use(authMiddleware);

// ROTAS COM AUTENTICAÇÃO
/*
 * Descrição: rota para criar Question
 * Retorno: apenas uma mensagem confirmando que a Question foi criada
 */
routerAuth.post('/', async (req, res) => {
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

/*
 * Descrição: rota para editar Question
 * Retorno: apenas uma mensagem confirmando que a Question foi editada
 */
routerAuth.put('/:questionId', async(req, res) => {
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

/*
 * Descrição: rota para deletar Question
 * Retorno: apenas uma mensagem confirmando que a Question foi deletada
 */
routerAuth.delete('/:questionId', async(req, res) => {
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

// ROTAS SEM AUTENTICAÇÃO
/*
 * Descrição: rota para apresentar todas as Question
 * Retorno: pacote json com uma lista de todas as Question
 */
router.get('/', async(req, res) => {
    try{
        const question = await Question.find();

        return res.status(200).send(question);
    }catch(error){
        console.log(error);
        res.status(400).send({error: "Erro ao carregar questões"});
    }
});

/*
 * Descrição: rota para apresentar uma Question por ID
 * Retorno: pacote json com uma Question filtradas por questionId
 */
router.get('/:questionId', async(req, res) => {
    try{
        const question = await Question.findById (req.params.questionId);
        if(question != null){
            res.status(200).send({question});
        }else{
            res.status(400).send({error: "Questão não existe"});
        }
    }catch(error){
        console.log(error);
        res.status(400).send({error: "Erro ao carregar questão"});
    }
});

/*
 * Descrição: rota para buscar por descritor
 * Retorno: pacote json com lista de Question filtradas por matter
 */
router.get('/matter/:matter', async(req, res) => {
    try{
        const questions = await Question.find({matter: req.params.matter});

        return res.status(200).send(questions);
    }catch(error){
        console.log(error);
        res.status(400).send({error: "Erro ao buscar por descritor"});
    }
});

// FUNÇÕES AUXILIARES
/*
 * Descrição: função que verifica se a userId é um professor
 * Retorno: boolean
 */
async function checkFlag(userId){
    const user = await User.findById(userId);
    if(user.flag == 'teacher'){
        return true;
    }else{
        return false;
    }
}

/*
 * Descrição: função que verifica se o userId da requisição é o mesmo do createBy da Question
 * Retorno: boolean
 */
async function checkCreator(userId, questionId){
    const question = await Question.findById(questionId);
    if(question.createBy == userId){
        return true
    }else{
        return false
    }
}

// EXPORTS
module.exports = app => {
    app.use('/question', router);
    app.use('/question', routerAuth);
};