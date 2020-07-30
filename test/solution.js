const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../src/app')

chai.use(chaiHttp)

const account = {
    'email': 'leonardo@teste.com',
    'password': 'default1'
}
const question = {
    "font": "test",
    "statement": "Chai test for POST Question",
    "alternatives": ["a", "b", "c"],
    "answer": "a",
    "matter": "Chai Test",
    "tags": ["test", "chai"]
}

module.exports = () => {
    let token, questionId, solutionId
    describe('', () => {
        before((done) => {
            chai.request(app)
                .post('/auth/authenticate')
                .send(account)
                .end((err, res) => {
                    token = res.body.token

                    chai.request(app)
                        .post('/question')
                        .set('Authorization', `Bearer ${token}`)
                        .send(question)
                        .end((err, res) => {
                            questionId = res.body._id
                        })
                    done()
                })
        })
        it('POST Criando Solution', (done) => {
            const solution = {
                "text": "test",
                "images": ["Chai test for POST Question"],
                "questionId": questionId
            }

            chai.request(app)
                .post('/solution')
                .set('Authorization', `Bearer ${token}`)
                .send(solution)
                .end((err, res) => {
                    if(err) done(err)

                    expect(res).to.have.status(200)
                    solutionId = res.body._id
                    done()
                })
        })
        it('POST Avaliando Solution', (done) => {
            const evaluate = {
                "evaluate": 0
            }

            chai.request(app)
                .post('/solution/' + solutionId)
                .set('Authorization', `Bearer ${token}`)
                .send(evaluate)
                .end((err, res) => {
                    if(err) done(err)

                    expect(res).to.have.status(200)
                    expect(res).to.be.an.object
                    done()
                })
        })
    })
}