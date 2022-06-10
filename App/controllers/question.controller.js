const db = require("../models/index");
const Question = require("../models/question.model")(
  db.sequelize,
  db.Sequelize
);
const Op = db.Sequelize.Op;

// Send a form on get request to to add new question 
exports.createget = (req, res) => {
  if (req.session.loggedin == true) {
    res.render("insert");
  } else {
    res.status(500).send("Please Login to access this page");
    res.end();
  }
};
// Create and Save a new Question
exports.create = (req, res) => {
  if (req.session.loggedin == true) {
    if (!req.body.title) {
      res.send("Title is Empty");
    }
    // Create a Question
    const question = {
      title: req.body.title,
      userId: req.session.userid,
      description: req.body.description,
      auther: req.session.username,
    };
    // Save Question in the database
    Question.create(question)
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

// Retrieve all questions from the database.

exports.userposts = (req, res) => {
  if (req.session.loggedin == true) {
    Question.findAll()
      .then((data) => {
        
        res.render("list", { values: data });
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
// get personal questions search according to user id that saved in questions also as a foreign key
exports.porsonalquests = (req, res) => {
  if (req.session.loggedin == true) {
    Question.findAll({ where: { id: req.session.userid } })
      .then((data) => {
        res.render("list", { values: data });
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

// Questions Search filter action where we search against title(full or any character from title) + start date + end date OR any of them 
exports.filter = (req, res) => {
  if (req.session.loggedin == true) {

const startdate = new Date(req.body.startdate);
const enddate = new Date(req.body.enddate);

 startdate.setUTCHours(00, 00, 00, 000);
 enddate.setUTCHours(23, 59, 59, 999);

    if (
      !req.body.title ||
      !startdate ||
      !enddate ||
      !req.body.id
    ) {
      let condition;
      if (req.body.title.length > 3) {
        condition = "%" + req.body.title + "%";
      }


      Question.findAll({
        where: {
          [Op.or]: [
            {
              title: { [Op.like]: condition },
            },
            {
            
              createdAt: {
                [Op.between]: [startdate.toLocaleDateString(), enddate.toLocaleDateString()],
              },
            },
          ],
        },
      })

        .then((data) => {
          res.render("list", { values: data });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error retrieving Question ",
          });
        });
    }
  } else {
    res.status(500).send("Please Login to access this page");
    res.end();
  }
};
// Update  question here we receive get request with ID(pk) to update question we search question and data against that id and send back
// with update form with existing values 
exports.update = (req, res) => {
  if (req.session.loggedin == true) {
    Question.findOne({ where: { id: req.params.id } })
      .then((data) => {
        //res.send(data);
        res.render("update", {
          title: data.title,
          description: data.description,
          id: data.id,
        });
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

// Here user edit value and submit and we get post request here to submit changes 
exports.updated = (req, res) => {
  const id = req.body.pid;
  Question.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.redirect("/questions/values");
      } else {
        res.send({
          message: `Cannot update Question with id=${id}. Maybe Question was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Question with id=" + id,
      });
    });
};
// Delete a Question with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Question.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.redirect("/questions/values");
      } else {
        res.send({
          message: `Cannot delete Question with id=${id}. Maybe Question was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Question with id=" + id,
      });
    });
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Question.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Question were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Question.",
      });
    });
};
