const Sequelize = require("sequelize");
const sequelize = new Sequelize("hoazify", "username", "password", {
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});

module.exports = sequelize;
