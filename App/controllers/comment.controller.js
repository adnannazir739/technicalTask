const db = require("../models/index");
const Comment =  require("../models/comment.model")(db.sequelize, db.Sequelize);


//Add New Comment
exports.get= (req,res) =>{
  if(req.session.loggedin == true)
  {
res.render("insert");
  }
  else
  {
    res.status(500).send('Please Login to access this page');
    res.end();
  }

}
