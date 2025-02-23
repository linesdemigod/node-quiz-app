const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { sequelize } = require("../config/dbConnection");
const { Question, Option, Quiz } = require("../models");
const { Op } = require("sequelize");

// Fetch Questions with Options
const fetchQuestions = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page from query params
  const limit = 5; // Number of questions per page
  const offset = (page - 1) * limit;

  // Get total number of questions
  const totalQuestions = await Question.count();
  const totalPages = Math.ceil(totalQuestions / limit);

  // Validate page number
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  // Validate request parameters
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const quizId = req.params.quizId;

    if (!quizId || isNaN(Number(quizId))) {
      return res.status(400).json({ message: "Invalid quizId" });
    }

    const questions = await Question.findAll({
      where: {
        quizId: quizId,
      },
      include: [
        {
          model: Option,
          as: "options",
          attributes: ["id", "optionText", "isCorrect"],
          required: false,
        },
        {
          model: Quiz,
          as: "quiz",
          attributes: ["id", "title", "description", "duration"],
          required: false,
        },
      ],
      order: [["id", "ASC"]],
      limit,
      offset,
    });

    return res.status(200).json({
      questions: questions,
      pagination: {
        currentPage: currentPage,
        totalPages: totalPages,
        hasNext: currentPage < totalPages,
        hasPrevious: currentPage > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching questions:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
});

const getQuestions = asyncHandler(async (req, res) => {
  // Validate request parameters
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  try {
    const quizId = req.params.quizId;

    if (!quizId || isNaN(Number(quizId))) {
      return res.status(400).json({ message: "Invalid quizId" });
    }

    const questions = await Question.findAll({
      where: {
        quizId: quizId,
      },
      include: [
        {
          model: Option,
          as: "options",
          attributes: ["id", "optionText", "questionId"],
          required: false,
        },

        {
          model: Quiz,
          as: "quiz",
          attributes: ["id", "title", "description", "duration"],
          required: false,
        },
      ],
    });

    return res.status(200).json({ questions: questions });
  } catch (error) {
    console.error("Error fetching questions:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
});

const quizAnswer = asyncHandler(async (req, res) => {
  const { q, id } = req.query;

  const option = await Option.findOne({
    where: {
      [Op.and]: [{ id: id }, { questionId: q }],
    },
  });

  return res.status(200).json({ option: option });
});

const showQuestion = asyncHandler(async (req, res) => {
  const questionId = req.params.questionId;

  const question = await Question.findOne({
    where: {
      id: questionId,
    },
    include: {
      model: Option,
      as: "options",
      attributes: ["id", "optionText", "questionId"],
    },
  });

  return res.status(200).json({ question: question });
});

const createQuestion = asyncHandler(async (req, res) => {
  const { quiz_id, question_text, option_text, is_correct } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0].msg });
  }

  const transaction = await sequelize.transaction();
  try {
    const question = await Question.create(
      {
        quizId: quiz_id,
        questionText: question_text,
      },
      {
        transaction,
      }
    );

    await Promise.all(
      option_text.map((option, index) =>
        Option.create(
          {
            questionId: question.id,
            optionText: option,
            isCorrect: is_correct[index],
          },
          { transaction }
        )
      )
    );

    await transaction.commit();

    return res.status(200).json({
      question: question,
      message: "Question created successfully",
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error occurred:", error);
  }
});

const updateQuestion = asyncHandler(async (req, res) => {
  const questionId = req.params.questionId;
  const { question_text, option_text, is_correct } = req.body;

  // Validate request data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0].msg });
  }

  // Check if the question exists
  const question = await Question.findByPk(questionId); // Use findByPk for primary key lookup
  if (!question) {
    return res.status(404).json({ error: "Question not found" });
  }

  const transaction = await sequelize.transaction(); // Start a transaction

  try {
    // Update the question inside the transaction
    await question.update(
      {
        questionText: question_text,
      },
      { transaction }
    );

    // Fetch existing options for the question
    const existingOptions = await Option.findAll({
      where: { questionId: questionId },
      transaction,
    });

    // Create a map of existing options by their text for easy comparison
    const existingOptionsMap = new Map(
      existingOptions.map((option) => [option.optionText, option])
    );

    // Process the incoming options
    await Promise.all(
      option_text.map(async (option, index) => {
        const optionText = option;
        const isCorrect = is_correct[index];

        if (existingOptionsMap.has(optionText)) {
          // If the option already exists, update it
          const existingOption = existingOptionsMap.get(optionText);
          await existingOption.update(
            {
              isCorrect: isCorrect,
            },
            { transaction }
          );
          existingOptionsMap.delete(optionText); // Mark as processed
        } else {
          // If the option is new, create it
          await Option.create(
            {
              questionId: questionId,
              optionText: optionText,
              isCorrect: isCorrect,
            },
            { transaction }
          );
        }
      })
    );

    // Delete any remaining options that were not updated
    const optionsToDelete = Array.from(existingOptionsMap.values());
    await Promise.all(
      optionsToDelete.map((option) => option.destroy({ transaction }))
    );

    // Commit the transaction if everything succeeds
    await transaction.commit();

    return res.status(200).json({
      question: question,
      message: "Question updated successfully",
    });
  } catch (error) {
    // Rollback the transaction in case of an error
    await transaction.rollback();
    console.error("Error occurred:", error);

    return res.status(500).json({ error: "Failed to update question" });
  }
});

const deleteQuestion = asyncHandler(async (req, res) => {
  const questionId = req.params.questionId;

  const question = await Question.findByPk(questionId);

  if (!question) {
    return res.status(404).json({ error: "Question not found" });
  }

  await question.destroy();

  return res.status(200).json({ message: "Question deleted successfully" });
});

module.exports = {
  fetchQuestions,
  getQuestions,
  showQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  quizAnswer,
};
