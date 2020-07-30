
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../src/app')

chai.use(chaiHttp)


module.exports = class UserTester {
    constructor(){
        this.userToken = ''
        this.account = {
            'email': 'leonardo@teste.com',
            'password': 'default1'
        }
    }

    async login(done) {
        await chai.request(app)
            .post('/auth/authenticate')
            .send(this.account)
            .then((res) => {
                res.should.have.status(200)
                res.body.should.be.an('object')
                this.userToken = res.body.token
                done()
            }).catch((err) => {
                done(err)
            })
    }

    executeTest = async () => {
        describe('Login', () => {
            it('Login de usuário', this.login(done))
        })
        //await this.login()
        console.log('USER TOKEN >> ' + this.userToken)
    }
}