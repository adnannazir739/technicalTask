const express = require("express");
const cors = require("cors");
const session = require("express-session");
const path = require("path");
const db = require("./app/models/index");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "static")));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/App/views"));

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

require("./App/routes/question.routes")(app);

require("./App/routes/login.routes")(app);
require("./App/routes/comment.routes")(app);

app.get("/", function (request, response) {
  // Render login template
  //response.sendFile(path.join(__dirname + '/App/views/login.ejs'));
  response.render(path.join("login"));
});

// app.get('/tutorials', function(data,res) {
// 	res.send('Welcome back, ' + req.session.username + `Hey there, welcome <a href=\'/logout'>click to logout</a>/n` ,data);

// 	response.end();
// });

// set port, listen for requests
const PORT = process.env.PORT || 1039;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
