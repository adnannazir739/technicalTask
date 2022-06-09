module.exports = app => {
    const Comment = require("../controllers/comment.controller.js");
    var router = require("express").Router();

      //  router.get("/add",Comment.add);
      //  router.post("/add",Comment.add);
      
    // // Create a new Question
    // router.post("/create", Questions.create);
    // router.get("/create", Questions.createget);

    // // Retrieve all Tutorials
    // router.get("/values", Questions.userposts);
    // router.post("/filter", Questions.filter);
    // router.get("/update/:id", Questions.update);
    // router.post("/updated", Questions.updated);
    // // Delete a Question with id
    // router.get("/delete/:id", Questions.delete);
    // // Delete all Tutorials
    // router.delete("/", Questions.deleteAll);
    // router.get("/adminquest/",Questions.porsonalquests);
    app.use('/comment', router);
  };