const Question = require('../models/question'),
    QuestionRepository = require('../repositorys/questionRepository');
const questionRepository = require('../repositorys/questionRepository');
    ObjectId = require('mongoose').Types.ObjectId;

module.exports = class QuestionController {
    async list(req, res) {
        try{
            const question = await new QuestionRepository().getQuestions(req.body, req.params.questionId)
            return res.status(200).send(question);
        }catch(error){
            console.log(error);
            res.status(400).send({error: "Erro ao carregar questões"});
        }
    }
    async create(req, res) {
        try{
            const question = await new QuestionRepository().createNewQuestion(req.body, req.userId)
            res.status(200).send(question)
        }catch(error){
            console.log(error);
            res.status(400).send({error: 'Erro ao criar questão'});
        }
    }
    async update(req, res) {
        try{
            const question  = await new QuestionRepository().updateQuestionById(req.body, req.params.questionId, req.userId)
            res.status(200).send(question)
        }catch(error){
            console.log(error);
            res.status(400).send({error: 'Erro ao editar questão'});
        }

    }
    async delete(req, res) {
        try{
            const question = await new QuestionRepository().deleteQuestionById(req.params.questionId, req.userId)
            res.status(200).send(question)
        }catch(error){
            console.log(error);
            res.status(400).send({error: 'Erro ao deletar questão'});
        }
    }
}
