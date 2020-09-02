const con = require("../dbConnector");
const path = require('path');
module.exports = {
  login(req, res) {
    try {
      const { username, password } = req.body;
      con.query("SELECT USUARIO_ID, USERNAME , PASSWORD, ROL_ID FROM usuario WHERE USERNAME = ? AND PASSWORD = ?"
        , [username, password], (err, userLogin) => {
          if (userLogin.length > 0) {
            console.log('loginController: ', userLogin);
            res.json({
              resp: 'OK',
              usrId: userLogin[0].USUARIO_ID,
              usrRol: userLogin[0].ROL_ID
            });
          } else {
            res.json({ resp: 'INVALID' });
          }

        });
    } catch (error) {
      console.log('ERROR: ', error);
      res.json({ resp: 'INVALID' });
    }
  },
};
