module.exports = (sequelize, Sequelize) => {


    const Comment = sequelize.define("comment", {
  
      id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
  