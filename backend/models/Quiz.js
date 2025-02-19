const { sequelize } = require("../config/dbConnection");
const { DataTypes } = require("sequelize");

const Quiz = sequelize.define(
  "Quiz",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "quizzes",
    timestamps: true,
  }
);

module.exports = Quiz;
