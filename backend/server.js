const express = require("express");
const route = require("./routes");

const app = express();

//use
app.use(express.json());

//rutas
app.use(route);

const PORT = process.env.PORT || 8000;

//routes

app.get("/registro");

app.listen(PORT , ()=>{
    console.log(`Listen on port ${PORT}`);
})