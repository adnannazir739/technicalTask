// module.exports = (app) => {
//   const Comment = require("../controllers/comment.controller.js");
//   var router = require("express").Router();
//   // add new comment
//   router.get("/add", Comment.add);
//   router.post("/added", Comment.add);

//   //list of comments
//   router.get("/list", Comment.get);

//   //  Edit and Delete Comments

//   router.get("/update/:id", Comment.update);
//   router.post("/updated", Comment.updated);
//   router.get("/delete/:id", Comment.delete);

//   app.use("/comment", router);
// };
