const con = require("../dbConnector");

module.exports = {
  login(req, res) {
    try {
      const { username, password } = req.body;
      const userLogin = con.query("SELECT USERNAME , PASSWORD FROM usuario WHERE USERNAME = ? AND PASSWORD = ?"
       ,[username , password]);
      if(userLogin){
        res.json({message: "bienvenido"});
      }else{
        res.json({message:"Usuario o contraseña incorrectas"});
      }
    } catch (error) {
      console.log(error);
    }
  },
};
