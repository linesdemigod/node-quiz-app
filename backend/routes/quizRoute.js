const express = require("express");
const {
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} = require("../controllers/QuizController");
const { body } = require("express-validator");
const validateToken = require("../middleware/tokenHandler");

const quizRouter = express.Router();

quizRouter.get("/quizzes", getQuiz);

quizRouter.use(validateToken); //login to access routes
quizRouter.post(
  "/create",

  [
    body("title", "The title is required").trim(),
    body("description").optional(),
    body("duration", "The title is required").trim(),
  ],

  createQuiz
);

quizRouter.put(
  "/update/:id",

  [
    body("title", "The title is required").trim(),
    body("description").optional(),
    body("duration", "The title is required").trim(),
  ],
  updateQuiz
);

quizRouter.delete("/delete/:id", deleteQuiz);

module.exports = quizRouter;
