const express = require("express");
const path = require('path');
const route = express.Router();
const loginController = require("./controllers/loginController");
const userController = require("./controllers/userController");
const productController = require("./controllers/productController");

//Login
route.post("/login" , loginController.register);

//Products
route.post("/products" , productController.registerProduct);

//Users
route.get("/users" , (req, res) => {
    res.sendFile(path.join(__dirname,'../frontend/users.html'));
});

module.exports = route;