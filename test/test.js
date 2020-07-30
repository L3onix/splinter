const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const app = require('../src/app')
const questionTester = require( './question')
const solutionTester = require('./solution')

chai.use(chaiHttp)



//console.log(userToken)
//const solutionTester = new TestSolution(userToken, '5cdefd8e682732000437a449')

//testes de questões
describe('TESTE QUESTION', questionTester) 
describe('TESTE SOLUTION', solutionTester)


//chai.request(app).get('/')
