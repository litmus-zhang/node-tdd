const Sequelize = require("sequelize");
const config = require("config");
const dbConfig = config.get("database");
const { database, username, password, storage, dialect, logging } = dbConfig;
const sequelize = new Sequelize(database, username, password, {
  dialect: dialect,
  storage: storage,
  logging: logging,
});

module.exports = sequelize;
