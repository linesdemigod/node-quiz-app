const { sequelize } = require("../config/dbConnection");

// import models
const User = require("./User");
const Quiz = require("./Quiz");
const Question = require("./Question");
const Option = require("./Option");

// Define relationships
Quiz.hasMany(Question, {
  foreignKey: "quizId",
  as: "questions",
});

Question.belongsTo(Quiz, {
  foreignKey: "quizId",
  as: "quiz",
});

Question.hasMany(Option, {
  foreignKey: "questionId",
  as: "options",
});

Option.belongsTo(Question, {
  foreignKey: "questionId",
  as: "question",
});

// sequelize
//   .sync({ alter: true })
//   .then(() => {
//     console.log("Database & tables synced!");
//   })
//   .catch((err) => {
//     console.error("Error syncing database:", err);
//   });

module.exports = {
  User,
  Quiz,
  Question,
  Option,
};
