module.exports = (sequelize, Sequelize) => {


    const Comment = sequelize.define("comment", {
  
      id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
     },
      QId:{

        type: Sequelize.INTEGER,

      },
      userId:{

        type: Sequelize.INTEGER,

      },
      
      description: {
        type: Sequelize.STRING,
      },
     
      auther: {
        type: Sequelize.STRING,
      },

    });

    return Comment;
    
  };
  