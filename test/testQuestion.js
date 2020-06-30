const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const expect = chai.expect
const request = require('supertest')
const app = require('../src/app')

chai.use(chaiHttp)

const address = 'http://localhost:9000/'
const account = {
    email: 'leonardo@teste.com',
    password: 'default1'
}

const agent = chai.request.agent(address)
agent.post('auth/authenticate')
    .send(account)
    .then((res) => {
        expect(res).to.have.
    })

module.exports = () => {
    before('Autenticacao', (done) => {
        authenticatedUser.post('/auth/authenticate')
            .send(account)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })
    describe('/GET Questions', () => {
        it('Testando GET todos as Questions', (done) => {
            chai.request(address)
                .get('question/')
                .end((err, res) => {
                    if(err) done(err)

                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
        })
    })

    describe('/POST Questions', () => {
        it('Teste POST Question', (done) => {
            const question = {
                "font": "test",
                "statement": "Chai test for POST Question",
                "alternatives": ["a", "b", "c"],
                "answer": "a",
                "matter": "Chai Test",
                "tags": ["test", "chai"]
            }

            chai.request(address)
                .post('question')
                .set({"Authorization": `Bearer `})
                .send(question)
                .end((err, res) => {
                    if(err) done(err)

                    expect(res).to.have.status(200)
                    expect(res.body.status).to.be.and('ok')
                    done()
                })
        })
    })
}