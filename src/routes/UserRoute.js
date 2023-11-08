const express = require('express')
const router = express.Router()
const { create } = require('../controllers/UserController')

router.post('/', create)

module.exports = router