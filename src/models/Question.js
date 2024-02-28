const { Schema, model } = require("mongoose");

const questionSchema = new Schema({
    createdBy: { type: String, require: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    deleted: { type: Boolean, default: false },
    questionText: String,
    questionOrigin: String,
    questionAlternatives: [
        {
            alternativeText: String,
            isCorrect: { type: Boolean, default: false },
        },
    ],
    comments: [
        {
            createdBy: { type: String, require: true },
            createdAt: { type: Date, default: Date.now() },
            updatedAt: { type: Date, default: Date.now() },
        },
    ],
    likes: {},
    dislikes: [String],
});

const Question = model("Question", questionSchema);

module.exports = Question;
