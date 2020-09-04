const express = require('express'),
    router = express.Router(),
    authMiddleware = require('../middlewares/auth'),
    Question = require('../models/question'),
    User = require('../models/user'),
    ObjectId = require('mongoose').Types.ObjectId;

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
        const query = {_id: req.params.questionId, createBy: new ObjectId(req.userId)}
		//req.body.createBy = req.userId
		//const question = await Question.updateOne({_id: req.params.questionId, createBy: req.userId}, req.body)
		const question = await Question.findOneAndUpdate(query, req.body)
        question ? res.status(200).send(question) : res.status(400).send({error: 'Erro ao editar questão'})
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
        const query = {_id: req.params.questionId, createBy: new ObjectId(req.userId)}
        const question = await Question.findOneAndDelete(query)
        question ? res.status(200).send(question) : res.status(400).send({error: 'Erro ao deletar questão'})
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
