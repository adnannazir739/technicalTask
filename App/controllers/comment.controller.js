const db = require("../models/index");
const Comment =  require("../models/comment.model")(db.sequelize, db.Sequelize);


// Send a form on get request to to add new Comment
exports.addComment = (req, res) => {
  if (req.session.loggedin == true) {
    res.render("addComment",{id:req.params.id});
  } else {
    res.status(500).send("Please Login to access this page");
    res.end();
  }
};


// Create and Save a new Comment
exports.create = (req, res) => {
  if (req.session.loggedin == true) {
   
   //console.log(abc);
  // console.log(req.session.username);
   
    // Create a Question
    const comment = {
    
      description: req.body.description,
      auther : req.session.username,
      QId: req.body.comid,
      userId: req.session.userid
    };
    // Save Question in the database
    Comment.create(comment)
      .then((data) => {
        //redirect to list of questions
        res.redirect("/questions/values");
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Question.",
        });
      });
  } else {
    // set error code and send error message we can also redirect to any page like again login page
    res.status(500).send("Please Login to access this page");
    res.end();
  }
};




//all Comments of specific question

exports.commentList = (req, res) => {
  if (req.session.loggedin == true) {
    Comment.findAll({ where: { QId: req.params.id } })
      .then((data) => {
        res.render("allcomments", { values: data });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Question ",
        });
      });
  } else {
    res.status(500).send("Please Login to access this page");
    res.end();
  }
};