const { Op } = require("sequelize");
const sequelize = require("../../../sequelize.js");
const { Sequelize } = require("sequelize");

const Orders = sequelize.define(
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

async function getOrders() {
  try {
    const ordersTable = await Orders.findAll({
      where: { order_id: { [Op.not]: null } },
    });

    if (!ordersTable) {
      return null;
    }

    const ordersIds = ordersTable.map((order) => order.order_id);

    return ordersIds;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = { getOrders, Orders };
