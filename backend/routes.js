const express = require("express");
const path = require('path');
const route = express.Router();
const loginController = require("./controllers/loginController");
const userController = require("./controllers/userController");
const productController = require("./controllers/productController");

//Login
route.post("/login" , loginController.register);

//Products
route.get("/products" , productController.getView);
route.post("/products/resgister" , productController.registerProduct);
route.get("/products/show" , productController.getProducts);
route.delete("/products/:id_producto" , productController.deleteProducts);
route.put("/products/:id_producto" , productController.editProduct);

//Users
route.get("/users" , (req, res) => {
    res.sendFile(path.join(__dirname,'../frontend/users.html'));
});

module.exports = route;