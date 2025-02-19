const express = require("express");
const { body } = require("express-validator");
const validateToken = require("../middleware/tokenHandler");
const {
  fetchQuestions,
  createQuestion,
  updateQuestion,
  showQuestion,
  deleteQuestion,
} = require("./../controllers/QuestionController");

const questionRouter = express.Router();

questionRouter.get("/quiz-questions/:quizId", fetchQuestions);

questionRouter.get("/show-question/:questionId", showQuestion);

questionRouter.post(
  "/store-question",
  [
    body("quiz_id", "The quiz id is required").isString(),
    body("question_text", "The question text is required").isString(),

    body("option_text.*", "The option text is required").isString(),
    body("is_correct.*", "The is correct is required").isString(),
  ],
  createQuestion
);

questionRouter.put(
  "/update-question/:questionId",
  [
    body("quiz_id", "The quiz id is required").isString(),
    body("question_text", "The question text is required").isString(),

    body("option_text.*", "The option text is required").isString(),
    body("is_correct.*", "The is correct is required").isString(),
  ],
  updateQuestion
);

questionRouter.delete("/delete-question/:questionId", deleteQuestion);

module.exports = questionRouter;
