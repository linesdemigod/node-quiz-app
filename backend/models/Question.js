const { sequelize } = require("../config/dbConnection");
const { DataTypes } = require("sequelize");

const Question = sequelize.define(
  "Question",
  {
    questionText: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    quizId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Quizzes",
        key: "id",
      },
    },
  },
  {
    tableName: "questions",
    timestamps: true,
  }
);

module.exports = Question;
