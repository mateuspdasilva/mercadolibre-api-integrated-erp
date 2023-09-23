const { Op } = require("sequelize");
const sequelize = require("../../../sequelize.js");
const { Sequelize } = require("sequelize");

const Questions = sequelize.define(
  "questions",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    question_id: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: true,
    },
    question_status: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    },
    question_text: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    },
    question_date_created: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
    answer_status: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    answer_text: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    answer_date_created: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false, // disable timestamps
  }
);

async function getQuestions() {
  try {
    const questionsTable = await Questions.findAll({
      where: { question_id: { [Op.not]: null } },
    });

    if (!questionsTable) {
      return null;
    }

    const questionsIds = questionsTable.map((question) => question.question_id);

    return questionsIds;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = { getQuestions, Questions };
