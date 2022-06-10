const Sequelize = require("sequelize");
const sequelize = new Sequelize("nodedb", "admin", "admin", {
  host: "DESKTOP-NVD89CQ",
  port: "1433",
  dialect: "mssql",
  pool: {
    max: 6,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;