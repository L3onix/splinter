const request = require("supertest");
const app = require("../app");

describe("Test the USER paths", () => {
  test("(POST)/user: when correct user data and correct request", async () => {
    const response = await request(app)
      .post("/user")
      .send({
        name: "Teste",
        email: "teste@teste.com",
        password: "teste123",
      })
    expect(response.statusCode).toBe(201)
  })
})
