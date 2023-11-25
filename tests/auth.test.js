const request = require("supertest");
const app = require("../src/app");
const {
    createNewUser,
    deleteAllUsers,
    getAccessTokenByUser,
} = require("./helpers/UserTestHelper");

describe("Test the AUTH paths", () => {
    let token = "";
    const name = "Dejair Lee";
    const email = "dejair@teste.com";
    const password = "asdfasdf";

    beforeEach(async () => {
        await deleteAllUsers();
        const user = await createNewUser(name, email, password);
        token = getAccessTokenByUser(user);
    });

    test("(GET)/auth/status: when user logged and correct request", (done) => {
        request(app)
            .get("/auth/status")
            .set("Authorization", token)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });

    test("(POST)/auth/login: when correct user data and correct request", (done) => {
        request(app)
            .post("/auth/login")
            .send({ email: email, password: password })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });

    test("(POST)/auth/register: when all user data is correct", (done) => {
        request(app)
            .post("/auth/register")
            .send({
                name: "Bartolomeu Gusman",
                email: "bartolomeu@teste.com",
                password: password,
            })
            .then((response) => {
                expect(response.statusCode).toBe(201);
                done();
            });
    });

    test("(POST)/auth/register: if response not load password", (done) => {
        request(app)
            .post("/auth/register")
            .send({
                name: "Bartolomeu Gusman",
                email: "bartolomeu@teste.com",
                password: password,
            })
            .then((response) => {
                expect(response.statusCode).toBe(201);
                expect(response.body).not.toHaveProperty("password");
                done();
            });
    });
});
