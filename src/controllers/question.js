const Question = require('../models/question'),
    User = require('../models/user'),
    ObjectId = require('mongoose').Types.ObjectId;

module.exports = class QuestionController {
    async list(req, res) {
        try{
            const skip = req.body.skip
            const limit = req.body.limit
            var query = {}

            req.body.matter ? query.matter = req.body.matter : null
            req.body.font ? query.font = req.body.font : null

            const question = await Question.find(query).limit(limit).skip(skip).sort('createAt');
            return res.status(200).send(question);
        }catch(error){
            console.log(error);
            res.status(400).send({error: "Erro ao carregar questões"});
        }
    }
    async create(req, res) {
        try{
            const question = await Question.create({...req.body, createBy: req.userId})
            res.status(200).send(question);
        }catch(error){
            console.log(error);
            res.status(400).send({error: 'Erro ao criar questão'});
        }
    }
    async update(req, res) {
        try{
            const query = {_id: req.params.questionId, createBy: new ObjectId(req.userId)}
            const question = await Question.findOneAndUpdate(query, req.body)
            question ? res.status(200).send(question) : res.status(400).send({error: 'Erro ao editar questão'})
        }catch(error){
            console.log(error);
            res.status(400).send({error: 'Erro ao editar questão'});
        }

    }
    async delete(req, res) {
        try{
            const query = {_id: req.params.questionId, createBy: new ObjectId(req.userId)}
            const question = await Question.findOneAndDelete(query)
            question ? res.status(200).send(question) : res.status(400).send({error: 'Erro ao deletar questão'})
        }catch(error){
            console.log(error);
            res.status(400).send({error: 'Erro ao deletar questão'});
        }
    }
}
