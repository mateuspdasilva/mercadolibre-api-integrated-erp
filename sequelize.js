const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("example", "example", "example", {
  host: "db", // Use the MySQL container's hostname
  port: 3306, // Port mapping to the host
  dialect: "mysql",
});

module.exports = sequelize;
