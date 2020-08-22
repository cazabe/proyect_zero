const express = require("express");

const app = express();
const PORT = process.env.PORT || 8000;

//routes

app.get("/registro");

app.listen(PORT , ()=>{
    console.log(`Listen on port ${PORT}`);
})