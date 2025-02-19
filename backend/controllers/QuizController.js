const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const Quiz = require("../models/Quiz");

// get, create, update, delete

// get all the quizzes
const getQuiz = asyncHandler(async (req, res) => {
  // introduce pagination later
  const quizzes = await Quiz.findAll();
  res.status(200).json(quizzes);
});

// create quiz
const createQuiz = asyncHandler(async (req, res) => {
  const { title, description, duration } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }

  // create the quiz
  const quiz = await Quiz.create({
    title,
    description,
    duration,
  });

  return res.status(201).json({ message: "Created successfully", quiz: quiz });
});

// update quiz
const updateQuiz = asyncHandler(async (req, res) => {
  const quizId = req.params.id;
  const { title, description, duration } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }

  //check if quiz exist
  const quiz = await Quiz.findOne({ where: { id: quizId } });
  if (!quiz) {
    return res.status(404).json({ message: "Quiz not found" });
  }
  // update the quiz
  const updatedQuiz = await quiz.update({ title, description, duration });

  return res
    .status(200)
    .json({ message: "Updated successfully", quiz: updatedQuiz });
});

// delete quiz
const deleteQuiz = asyncHandler(async (req, res) => {
  const quizId = req.params.id;
  const deletedCount = await Quiz.destroy({
    where: {
      id: quizId,
    },
  });

  if (deletedCount === 0) {
    return res.status(404).json({ message: "Quiz not found" });
  }

  return res.status(200).json({ message: "Deleted successfully" });
});

module.exports = {
  createQuiz,
  getQuiz,
  updateQuiz,
  deleteQuiz,
};
