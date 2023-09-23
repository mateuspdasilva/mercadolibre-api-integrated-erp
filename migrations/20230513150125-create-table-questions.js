"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
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
          defaultValue: null,
        },
        answer_text: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        answer_date_created: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: null,
        },
      },
      {
        timestamps: false, // disable timestamps
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("questions");
  },
};
