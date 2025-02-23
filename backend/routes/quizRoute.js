const express = require("express");
const {
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  showQuiz,
} = require("../controllers/QuizController");
const { body } = require("express-validator");
const validateToken = require("../middleware/tokenHandler");

const quizRouter = express.Router();

quizRouter.get("/get-quizzes", getQuiz);

// quizRouter.use(validateToken); //login to access routes
quizRouter.post(
  "/store-quiz",

  [
    body("title", "The title is required").trim(),
    body("description").optional(),
    body("duration", "The title is required").trim(),
  ],
  validateToken,
  createQuiz
);

quizRouter.put(
  "/update-quiz/:id",

  [
    body("title", "The title is required").trim(),
    body("description").optional(),
    body("duration", "The title is required").trim(),
  ],
  validateToken,
  updateQuiz
);

quizRouter.get("/get-quiz", validateToken, showQuiz);

quizRouter.delete("/delete-quiz/:id", validateToken, deleteQuiz);

module.exports = quizRouter;
