const express = require("express");
const { body } = require("express-validator");
const validateToken = require("../middleware/tokenHandler");
const {
  fetchQuestions,
  getQuestions,
  createQuestion,
  updateQuestion,
  quizAnswer,
  showQuestion,
  deleteQuestion,
} = require("./../controllers/QuestionController");

const questionRouter = express.Router();

questionRouter.get("/quiz-questions/:quizId", fetchQuestions);

questionRouter.get("/get-question/:questionId", showQuestion);

questionRouter.get("/question-answer", quizAnswer);

questionRouter.get("/questions/:quizId", getQuestions);

// questionRouter.use(validateToken);

questionRouter.post(
  "/store-question",
  [
    body("quiz_id", "The quiz id is required").isString(),
    body("question_text", "The question text is required").isString(),

    body("option_text.*", "The option text is required").isString(),
    body("is_correct", "The is correct is required"),
  ],

  createQuestion
);

questionRouter.put(
  "/update-question/:questionId",
  [
    body("question_text", "The question text is required").isString(),

    body("option_text.*", "The option text is required").isString(),
    body("is_correct", "The is correct is required"),
  ],

  updateQuestion
);

questionRouter.delete(
  "/delete-question/:questionId",

  deleteQuestion
);

module.exports = questionRouter;
