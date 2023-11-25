const request = require("supertest");
const app = require("../src/app");
const {
  createNewUser,
  getAccessTokenByUser,
  deleteUserById,
} = require("./helpers/UserTestHelper");
const {
  deleteQuestionById,
  createNewQuestion,
} = require("./helpers/QuestionTestHelper");

describe("Test the QUESTION paths", () => {
  let user = {};
  let userToken = "";
  let question = {};

  beforeEach(async () => {
    user = await createNewUser("Goraka", "goraka@example.com", "123123");
    userToken = getAccessTokenByUser(user);
    question = await createNewQuestion(user);
  });

  afterEach(async () => {
    await deleteQuestionById(question._id);
    await deleteUserById(user._id);
  });

  test("(GET)/question/:id: when question id exists", (done) => {
    request(app)
      .get(`/question/${question._id}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  // TODO: apagar quetão depois de executar o teste
  test("(POST)/question: when all question data is correct and user is logged", (done) => {
    request(app)
      .post("/question")
      .set("Authorization", userToken)
      .send({
        createdBy: user._id,
        questionText:
          "Uma cozinheira produz docinhos especiais por encomenda. Usando uma receita-base de massa, ela prepara uma porção, com a qual produz 50 docinhos maciços de formato esférico, com 2 cm de diâmetro. Um cliente encomenda 150 desses docinhos, mas pede que cada um tenha formato esférico com 4 cm de diâmetro. A cozinheira pretende preparar o número exato de porções da receita-base de massa necessário para produzir os docinhos dessa encomenda. Quantas porções da receita-base de massa ela deve preparar para atender esse cliente?",
        questionAlternatives: [
          {
            alternativeId: 0,
            alternativeText: "2",
          },
          {
            alternativeId: 1,
            alternativeText: "3",
          },
          {
            alternativeId: 2,
            alternativeText: "6",
            isCorrect: true,
          },
          {
            alternativeId: 3,
            alternativeText: "12",
          },
          {
            alternativeId: 4,
            alternativeText: "24",
          },
        ],
        questionOrigin: "INEP",
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        done();
      });
  });

  test("(PUT)/question/:id: when all question data is correct and user is logged", (done) => {
    request(app)
      .put(`/question/${question._id}`)
      .set("Authorization", userToken)
      .send({
        createdBy: user._id,
        questionText:
          "Uma cozinheira produz docinhos especiais por encomenda. Usando uma receita-base de massa, ela prepara uma porção, com a qual produz 50 docinhos maciços de formato esférico, com 2 cm de diâmetro. Um cliente encomenda 150 desses docinhos, mas pede que cada um tenha formato esférico com 4 cm de diâmetro. A cozinheira pretende preparar o número exato de porções da receita-base de massa necessário para produzir os docinhos dessa encomenda. Quantas porções da receita-base de massa ela deve preparar para atender esse cliente?",
        questionAlternatives: [
          {
            alternativeId: 0,
            alternativeText: "a",
          },
          {
            alternativeId: 1,
            alternativeText: "b",
          },
          {
            alternativeId: 2,
            alternativeText: "c",
            isCorrect: true,
          },
          {
            alternativeId: 3,
            alternativeText: "d",
          },
          {
            alternativeId: 4,
            alternativeText: "e",
          },
        ],
        questionOrigin: "PENI",
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
