"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "users",
      {
        id: {
          type: Sequelize.SMALLINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        first_name: {
          type: Sequelize.STRING,
        },
        last_name: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: true,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: true,
          type: Sequelize.DATE,
        },
        code: {
          type: Sequelize.TEXT,
          allowNull: true,
          charset: "latin1",
          collate: "latin1_general_ci",
        },
        access_token: {
          type: Sequelize.TEXT,
          allowNull: true,
          charset: "latin1",
          collate: "latin1_general_ci",
        },
        client_id: {
          type: Sequelize.TEXT,
          allowNull: true,
          charset: "latin1",
          collate: "latin1_general_ci",
        },
        client_secret: {
          type: Sequelize.TEXT,
          allowNull: true,
          charset: "latin1",
          collate: "latin1_general_ci",
        },
        user_id: {
          type: Sequelize.TEXT,
          allowNull: true,
          charset: "latin1",
          collate: "latin1_general_ci",
        },
        last_updated: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        tableName: "users",
        timestamps: false,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
