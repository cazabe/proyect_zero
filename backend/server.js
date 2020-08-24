const express = require("express");
const route = require("./routes");

const app = express();

app.use(express.json());
app.use(express.static('../frontend'));
app.use(route);

const PORT = process.env.PORT || 8000;

//routes
app.get("/registro");

app.listen(PORT , ()=>{
    console.log(`Listen on port ${PORT}`);
})