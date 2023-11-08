const { Schema, model } = require("mongoose");

const questionSchema = new Schema({
    createdBy: { type: String, require: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    questionText: String,
    questionAlternatives: [
        {
            alternativeText: String,
            isCorrect: { type: Boolean, default: false },
        },
    ],
    questionOrigin: String,
});

const Question = model("Question", questionSchema);

module.exports = Question;
