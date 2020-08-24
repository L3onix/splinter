const express = require('express'),
    router = express.Router(),
    authMiddleware = require('../middlewares/auth'),
    Question = require('../models/question'),
    User = require('../models/user');

// ROTAS COM AUTENTICAÇÃO
/*
 * Descrição: rota para criar Question
 * Retorno: apenas uma mensagem confirmando que a Question foi criada
 */
router.post('/', authMiddleware, async (req, res) => {
    try{
		const question = await Question.create({...req.body, createBy: req.userId})
        res.status(200).send(question);
    }catch(error){
        console.log(error);
        res.status(400).send({error: 'Erro ao criar questão'});
    }
});

/*
 * Descrição: rota para editar Question
 * Retorno: apenas uma mensagem confirmando que a Question foi editada
 */
router.put('/:questionId', authMiddleware, async(req, res) => {
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
router.delete('/:questionId', authMiddleware, async(req, res) => {
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
        const matter = req.body.matter
        const limit = req.body.limit
		let question
		if(matter){
        	question = await Question.find({matter: matter}).limit(limit).sort('createAt');
		}else{
			question = await Question.find();
		}

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
};
