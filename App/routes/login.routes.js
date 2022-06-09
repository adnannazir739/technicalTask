module.exports = app => {
    const loginuser = require("../controllers/login.controller.js");
    var router = require("express").Router();


app.post('/', loginuser.findOne );
app.get('/logout',loginuser.logout);



app.use('/login', router);

};