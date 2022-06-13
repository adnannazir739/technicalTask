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

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "static")));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/App/views"));

db.sequelize.sync().then(() => {
  //console.log("Drop and re-sync db.");
});

require("./App/routes/question.routes")(app);

require("./App/routes/login.routes")(app);
require("./App/routes/comment.routes")(app);

app.get("/", function (request, response) {
  
  response.render(path.join("login"));
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
