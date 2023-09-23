const { Op } = require("sequelize");
const sequelize = require("../../../sequelize.js");
const { Sequelize } = require("sequelize");

const Products = sequelize.define(
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
  { timestamps: false }
);

async function getProductsTable() {
  try {
    const productsTable = await Products.findAll({
      where: { product_id: { [Op.not]: null } },
    });

    if (!productsTable) {
      return null;
    }

    const productIds = productsTable.map((product) => product.product_id);

    return productIds;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = { getProductsTable, Products };
