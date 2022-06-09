module.exports = (sequelize, Sequelize) => {
  const Comments = require("./comment.model.js")(sequelize, Sequelize);

  const Question = sequelize.define("question", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    auther: {
      type: Sequelize.STRING,
    },
  });

  Question.hasMany(Comments, { foreignKey: "QId" });

  return Question;
};
