module.exports = app => {
    const Questions = require("../controllers/question.controller.js");
    var router = require("express").Router();

    // Create a new Question
    router.post("/create", Questions.create);
    router.get("/create", Questions.createget);

    // Retrieve all Tutorials
    router.get("/values", Questions.userposts);
    router.post("/filter", Questions.filter);
    router.get("/update/:id", Questions.update);
    router.post("/updated", Questions.updated);
    // Delete a Question with id
    router.get("/delete/:id", Questions.delete);
    // Delete all Tutorials
    router.delete("/", Questions.deleteAll);
    router.get("/adminquest/",Questions.porsonalquests);
    app.use('/questions', router);
  };