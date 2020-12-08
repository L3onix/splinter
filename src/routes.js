const express = require('express'),
    router = express.Router(),
    authMiddleware = require('./middlewares/auth'),
    AuthController = require('./controllers/authController'),
    QuestionController = require('./controllers/questionController'),
    SolutionController = require('./controllers/solutionController'),
    CommentController = require('./controllers/commentController')


router.post('/auth/register', (req, res) => {return new AuthController().register(req, res)})
router.post('/auth/authenticate', (req, res) => {return new AuthController().authenticate(req, res)})

router.get('/question/', (req, res) => {return new QuestionController().list(req, res)})
router.get('/question/:questionId', (req, res) => {return new QuestionController().list(req, res)})
router.post('/question/', authMiddleware, (req, res) => {return new QuestionController().create(req, res)})
router.put('/question/:questionId', authMiddleware, (req, res) => {return new QuestionController().update(req, res)})
router.delete('/question/:questionId', authMiddleware, (req, res) => {return new QuestionController().delete(req, res)})

router.get('/solution/:solutionId', (req, res) => {return new SolutionController().list(req,res)})
router.post('/solution', authMiddleware, (req, res) => {return new SolutionController().create(req,res)})
router.put('/solution/:solutionId', authMiddleware, (req, res) => {return new SolutionController().update(req,res)})
router.patch('/solution/:solutionId', authMiddleware, (req, res) => {return new SolutionController().toEvaluate(req,res)})
router.delete('/solution/:solutionId', authMiddleware, (req, res) => {return new SolutionController().delete(req,res)})

router.get('/comment/:commentId', (req, res) => {return new CommentController().list(req, res)})
router.post('/comment', authMiddleware, (req, res) => {return new CommentController().create(req, res)})
router.put('/comment/:commentId', authMiddleware, (req, res) => {return new CommentController().update(req, res)})
router.delete('/comment/:commentId', authMiddleware, (req, res) => {return new CommentController().delete(req, res)})

module.exports = app => app.use(router)
