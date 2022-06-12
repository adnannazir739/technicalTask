 module.exports = (app) => {
  const Comment = require("../controllers/comment.controller.js");
  var router = require("express").Router();
//   // add new comment
//   router.get("/add", Comment.add);
//   router.post("/added", Comment.add);

//   //list of comments
//   router.get("/list", Comment.get);

//   //  Edit and Delete Comments

    router.get("/commentForm/:id", Comment.addComment);
   router.post("/create", Comment.create);
   router.get("/allcomments/:id", Comment.commentList);
//   router.get("/delete/:id", Comment.delete);

  app.use("/comments", router);
 };
