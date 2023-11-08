const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/User");
const { encryptPassword } = require("../src/helpers/BcryptHelper");
const { generateAccessToken } = require("../src/helpers/JwtHelper");

describe("Test the AUTH paths", () => {
    let token = "";
    const name = "Dejair Lee";
    const email = "dejair@teste.com";
    const password = "asdfasdf";

    beforeEach(async () => {
        await User.deleteMany({});
        const user = await User.create({
            name: name,
            email: email,
            password: String(encryptPassword(password)),
        });

        token = generateAccessToken(user);
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
});
