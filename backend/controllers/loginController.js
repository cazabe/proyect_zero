const con = require("../dbConnector");
const path = require('path');
module.exports = {
  login(req, res) {
    try {
      const { username, password } = req.body;
      const userLogin = con.query("SELECT USERNAME , PASSWORD FROM usuario WHERE USERNAME = ? AND PASSWORD = ?"
       ,[username , password]);
      if(userLogin){
        res.sendFile(path.join(__dirname,'../../frontend/products.html'));
      }else{
        res.json({message:"Usuario o contraseña incorrectas"});
      }
    } catch (error) {
      console.log(error);
    }
  },
};
