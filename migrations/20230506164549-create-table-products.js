"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "products",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        product_id: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
          unique: true,
        },
        product_title: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        product_price: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        product_quantity: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        timestamps: false, // disable timestamps
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("products");
  },
};
