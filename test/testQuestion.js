const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const expect = chai.expect


chai.use(chaiHttp)

module.exports = () => {
    describe('/GET Questions', () => {
        it('Testando GET todos as Questions', (done) => {
            chai.request('http://localhost:9000')
                .get('/question/')
                .end((err, res) => {
                    console.log(res)
                    expect(res.status).to.equal(200)
                    done()
                })
        })
    })
}