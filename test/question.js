const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const expect = chai.expect
const request = require('supertest')
const app = require('../src/app')

chai.use(chaiHttp)

const account = {
    'email': 'leonardo@teste.com',
    'password': 'default1'
}

module.exports = () => {
    let token, questionId
    describe('', () => {
        before((done) => {
            chai.request(app)
                .post('/auth/authenticate')
                .send(account)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    token = res.body.token
                    done()
                })
        })
        it('GET Listando Question', (done) => {
            chai.request(app)
                .get('/question')
                .end((err, res) => {
                    if(err) done(err)

                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
        })
        it('POST Criando Question', (done) => {
            const question = {
                "font": "test",
                "statement": "Chai test for POST Question",
                "alternatives": ["a", "b", "c"],
                "answer": "a",
                "matter": "Chai Test",
                "tags": ["test", "chai"]
            }

            chai.request(app)
                .post('/question')
                .set('Authorization', `Bearer ${token}`)
                .send(question)
                .end((err, res) => {
                    if(err) done(err)

                    expect(res).to.have.status(200)
					questionId = res.body._id
                    done()
                })
        })
        it('PUT Editando Question', (done) => {
            const question = {
                "font": "test",
                "statement": "Chai test for POST Question",
                "alternatives": ["a", "b", "c"],
                "answer": "a",
                "matter": "Chai Test",
                "tags": ["test", "chai"]
            }

            chai.request(app)
                .put('/question/' + questionId)
                .set('Authorization', `Bearer ${token}`)
                .send(question)
                .end((err, res) => {
                    if(err) done(err)

                    expect(res).to.have.status(200)
                    done()
                })
        })
        it('DELETE Deletando Question', (done) => {
            chai.request(app)
                .delete('/question/' + questionId)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    if(err) done(err)

                    expect(res).to.have.status(200)
                    done()
                })
        })
    })
}
