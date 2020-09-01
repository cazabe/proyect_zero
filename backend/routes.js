const express = require("express");
const path = require('path');
const route = express.Router();
const loginController = require("./controllers/loginController");
const userController = require("./controllers/userController");
const productController = require("./controllers/productController");

//Login
route.post("/" , loginController.login);

route.get("/" , (req, res) => {
    res.sendFile(path.join(__dirname,'../frontend/login.html'));
});

// Users
route.get("/users" , (req, res) => {
    res.sendFile(path.join(__dirname,'../frontend/users.html'));
});
route.post("/users/create" , userController.create);
route.post("/users/update" , userController.update);
route.post("/users/delete" , userController.delete);
route.get("/users/read" , userController.read);

//Products
route.get("/products" , productController.getView);
route.post("/products/resgister" , productController.registerProduct);
route.get("/products/show" , productController.getProducts);
route.put("/products/:id_producto" , productController.deleteProducts);
route.put("/products/edit/:id_producto" , productController.editProduct);


module.exports = route;