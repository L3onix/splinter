const Comment = require('../models/comment'),
    ObjectId = require('mongoose').Types.ObjectId;


module.exports = class CommentController {
    async list(req, res){
        try{
            const comments = await Comment.findById(req.params.commentId)
            return res.status(200).send(comments)
        }catch(err){
            console.log(err)
            res.status(400).send({error: err.message})
        }
    }
    async create(req, res){
        try{
            const comment = await Comment.create({...req.body, createBy: req.userId})
            res.status(200).send(comment)
        }catch(err){
            console.log(err)
            res.status(400).send({error: err.message})
        }
    }
    async update(req, res){
        try{
            const query = {_id: req.params.commentId, createBy: new ObjectId(req.userId)}
            const comment = await Comment.findOneAndUpdate(query, req.body)
            res.status(200).send(comment)
        }catch(err){
            console.log(err)
            res.status(400).send({error: err.message})
        }
    }
    async delete(req, res){
        try{
            const query = {_id: req.params.commentId, createBy: new ObjectId(req.userId)}
            const comment = await Comment.findOneAndDelete(query)
            res.status(200).send(comment)
        }catch(err){
            console.log(err)
            res.status(400).send({error: err.message})
        }
    }
}