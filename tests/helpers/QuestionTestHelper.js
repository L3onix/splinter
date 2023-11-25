const Question = require("../../src/models/Question");

function createNewQuestion(user) {
    return Question.create({
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
    });
}

function deleteAllQuestions() {
    Question.deleteMany({});
}

function deleteQuestionById(id) {
    Question.deleteOne(id);
}

module.exports = {
    createNewQuestion,
    deleteAllQuestions,
    deleteQuestionById,
};
