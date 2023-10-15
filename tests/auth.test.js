const request = require('supertest')
const app = require('../app')

describe("Test the AUTH paths", () => {
  test("(GET)/auth/status: when user logged and correct request", (done) => {
    request(app)
      .get("/auth/status")
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21lIjoibWFyY2VsbyIsImVtYWlsIjoidGVzdGVAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTY5Njg3NzQ4OH0.pj_P0n-iPO7f7Z2emCgUo7Yv4kd6DDxnu9WsXvXD0Qk')
      .then((response) => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })

  test("(POST)/auth/login: when correct user data and correct request", (done) => {
    request(app)
      .post("/auth/login")
      .send({ login: "teste", password: "default1" })
      .then((response) => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })
})

