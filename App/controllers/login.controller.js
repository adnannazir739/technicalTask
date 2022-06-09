const db = require("../models/index");
const Login = require("../models/login.model.js")(db.sequelize, db.Sequelize);
//const Op = db.Sequelize.Op;

exports.logout = (request, response) => {
  request.session.destroy();

  response.redirect("/");
};

exports.findOne = (request, response) => {
  // Capture the input fields
  let username = request.body.username;
  let password = request.body.password;

  // Ensure the input fields exists and are not empty

  if (username && password) {
    //var condition= username==Login.username;

    Login.findAll({ where: { username: username, password: password } }).then(
      (data) => {
        if (data.length > 0) {
          // 			// Authenticate the user
          request.session.loggedin = true;
          request.session.username = data.username;
          request.session.userid = data.id;
          // console.log(data);
          //   request.session.userid = id;
          // 			// Redirect to home page
          response.redirect("/questions/values");
          //response.render("list")
          // response.send('/values');
        } else {
          response.status(500).send("Username or Password is Invalid");
          response.end();
        }
        // response.status(500).send(data);
        // response.end();
      }
    );
  }
};
