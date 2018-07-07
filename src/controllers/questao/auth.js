const express = require('express'),
    router = express.Router(),
    authMiddleware = require('../../middlewares/auth'),
    Questao = require('../../models/questao'),
    Usuario = require('../../models/user');

router.use(authMiddleware);

//rota para criar Questao
router.post('/', async (req, res) => {
    try{
        //buscando usuário da requisição
        //const user = await Usuario.findById(req.userId);
        //checando se o usuário é professor
        if(checarProfessor(req.userId)){
            //criando Questao
            await Questao.create({...req.body, criador: req.userId});
            res.status(200).send({status: 'Sucesso ao criar questão'});
        }else{
            res.status(400).send({status: 'Usuário não é professor'});
        }
    }catch(err){
        console.log(err);
        res.status(400).send({status: 'Erro ao criar questão'});
    }
});

//rota para editar Questao
router.put('/:questaoId', async(req, res) => {
    try{
        
    }catch(err){
        console.log(err);
        res.status(400).send({status: 'Erro ao editar questão'});
    }
});

function checarProfessor(userId){
    const user = await Usuario.findById(userId);
    if(user.professor == true){
        return true;
    }else{
        return false;
    }
}

module.exports = app => app.use('/questaoAuth', router);