const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const testQuestion = require( './testQuestion')

chai.use(chaiHttp)

//testes de questões
describe('Questions', testQuestion)