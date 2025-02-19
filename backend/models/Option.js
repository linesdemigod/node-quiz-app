const { sequelize } = require("../config/dbConnection");
const { DataTypes } = require("sequelize");

const Option = sequelize.define(
  "Option",
  {
    optionText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
    },

    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Questions",
        key: "id",
      },
    },
  },
  {
    tableName: "options",
    timestamps: true,
  }
);

module.exports = Option;
