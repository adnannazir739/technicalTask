module.exports = (sequelize, Sequelize) => {
  const Questions = require("./question.model.js")(sequelize, Sequelize);
  const Comments = require("./comment.model.js")(sequelize, Sequelize);

  const Login = sequelize.define("login", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  Login.hasMany(Questions, { foreignKey: "userId" });
  Login.hasMany(Comments, { foreignKey: "userId" });

  return Login;
};
