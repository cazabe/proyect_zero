const con = require("../dbConnector");

module.exports = {
  async registerProduct(req, res) {
    // res.render('index');
    //date fromat
    let today = new Date().toISOString().slice(0, 10);

    const { usuario_id, nombre, costo, precio, stock, estado } = req.body;

    try {
      producto = {
        USUARIO_ID: usuario_id,
        NOMBRE: nombre,
        COSTO: costo,
        PRECIO: precio,
        STOCK: stock,
        FECHA_MODIFICACION: today,
        ESTADO: estado,
      };

      await con.query('INSERT INTO producto set ?', [producto]);

      res.json({ producto });
      
    } catch (error) {
      console.log(error);
    }
  },
};
