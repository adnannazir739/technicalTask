module.exports = {
    HOST: "DESKTOP-NVD89CQ",
    PORT: "1433",
    USER:"admin",
    PASSWORD:"admin",
    trustedConnection: true,
    DB: "nodedb",
    dialect: "mssql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
