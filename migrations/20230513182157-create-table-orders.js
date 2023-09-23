"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "orders",
      {
        order_id: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
          unique: true,
        },
        order_status: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        date_created: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: null,
        },
        date_closed: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: null,
        },
        expiration_date: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: null,
        },
        date_last_updated: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: null,
        },
        order_items: {
          type: Sequelize.JSON,
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
    await queryInterface.dropTable("orders");
  },
};
