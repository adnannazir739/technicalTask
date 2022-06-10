const db = require("../models/index");
const Login = require("../models/login.model.js")(db.sequelize, db.Sequelize);

//Session Expire on Logout Button
exports.logout = (request, response) => {
  request.session.destroy();

  response.redirect("/");
};

// Call on User login page to validate from database
exports.findOne = (request, response) => {
  // Capture the input fields
  let username = request.body.username;
  let password = request.body.password;

  // Ensure the input fields exists and are not empty

  if (username && password) {
    // condition;
    Login.findAll({ where: { username: username, password: password } }).then(
      (data) => {
        if (data.length > 0) {
          // 			// Authenticate the user
          request.session.loggedin = true;
          request.session.username = data.username;
          request.session.userid = data.id;
        
          response.redirect("/questions/values");
         
        } else {
          response.status(500).send("Username or Password is Invalid");
          response.end();
        }
      
      }
    );
  }
};
