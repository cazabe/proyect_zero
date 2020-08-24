const express = require("express");
const path = require('path');
const route = express.Router();
const loginController = require("./controllers/loginController");
const userController = require("./controllers/userController");

route.post("/login" , loginController.register);

route.get("/users" , (req, res) => {
    res.sendFile(path.join(__dirname,'../frontend/users.html'));
});

module.exports = route;