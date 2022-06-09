
const db = require("../models/index");
const Comment =  require("../models/comment.model")(db.sequelize, db.Sequelize);

//const Op = db.Sequelize.Op;

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
// Create and Save a new Question
exports.create = (req, res) => {
  if(req.session.loggedin == true)
  {



  // Create a comment
  const comment = {
    description: req.body.description,
    auther: req.session.username,
    userId: req.session.userid,
    QId : req.params.id,
    
  };
  // Save Question in the database
  Question.create(question)
    .then(data => {
      res.redirect('/questions/values');

    //  res.redirect('/questions',data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Question."
      });
    });


  }
   else{
    res.status(500).send('Please Login to access this page');
   res.end();
  
  };
};
// Retrieve all questions from the database.

exports.userposts = (req, res) => {
  if(req.session.loggedin == true)
  {

  
      Question.findAll()
        .then(data => {
          //res.send(data);
          res.render("list",{values:data});
        })
        .catch(err => {
          res.status(500).send({
            message: "Error retrieving Question " 
          });
        });
    
    
    }
   else
   {
      res.status(500).send('Please Login to access this page');
     res.end();
    
    };
    };



exports.filter = (req, res) => {
  if(req.session.loggedin == true)
  {
    
    if (!req.body.title || !req.body.startdate || !req.body.enddate || !req.body.id) {
      
    //  Question.findAll( { where: {uderId : req.session.id , title : req.body.title, createdAt : { $between: [req.body.startdate, req.body.enddate]}  } } )
    
    Question.findAll( { where: { title:req.body.title } } )

        .then(data => {
          res.render("list",{values:data});
        })
        .catch(err => {
          res.status(500).send({
            message: "Error retrieving Question " 
          });
        });
      }
    
    }
   else
   {
      res.status(500).send('Please Login to access this page');
     res.end();
    
    };
    };

    exports.update = (req, res) => {
      if(req.session.loggedin == true)
      {
    
      
          Question.findOne({ where: { id:req.params.id } })
            .then(data => {
              //res.send(data);
              res.render("update",{title:data.title , description: data.description,id:data.id});
            })
            .catch(err => {
              res.status(500).send({
                message: "Error retrieving Question " 
              });
            });
        
        
        }
       else
       {
          res.status(500).send('Please Login to access this page');
         res.end();
        
        };
        };


// Update a Question by the id in the request
exports.updated = (req, res) => {
    const id = req.body.pid;
    Question.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.redirect('/questions/values');
        } else {
          res.send({
            message: `Cannot update Question with id=${id}. Maybe Question was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Question with id=" + id
        });
      });
  };
// Delete a Question with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Question.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.redirect("/questions/values");
        } else {
          res.send({
            message: `Cannot delete Question with id=${id}. Maybe Question was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Question with id=" + id
        });
      });
  };
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Question.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Question were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Question."
        });
      });
  };
