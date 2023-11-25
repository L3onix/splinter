const Question = require("../models/Question");

async function show(req, res) {
    try {
        Question.findById(req.params.id).then((question) => {
            if (!question) res.status(400).end();
            res.status(200).json({ success: true, data: question }).end();
        });
    } catch (error) {
        console.log(error);
        res.status(400).end();
    }
}

async function create(req, res) {
    try {
        Question.create(req.body).then((question) => {
            if (!question) res.status(400).end();
            res.status(201).json({ success: true, data: question }).end();
        });
    } catch (error) {
        console.log(error);
        res.status(400).end();
    }
}

async function update(req, res) {
    try {
        req.body.updatedAt = Date.now();
        Question.findByIdAndUpdate(req.params.id, req.body).then((question) => {
            if (!question) res.status(400).end();
            res.status(200).json({ success: true, data: question }).end();
        });
    } catch (error) {
        console.log(error);
        res.status(400).end();
    }
}

async function deleteById(req, res) {
    try {
        const id = req.params.id;
        Question.findByIdAndUpdate(id, { activated: false }).then(
            (question) => {
                if (!question) res.status(400).end();
                res.status(200).end();
            }
        );
    } catch (error) {
        console.log(error);
        res.status(400).end();
    }
}

// TODO: função para adicionar comentários
// TODO: função para editar comentários
// TODO: função para deletar comentários
//

module.exports = {
    show,
    create,
    update,
};
