const con = require("../dbConnector");
const path = require('path');
module.exports = {
  async getView() {

    res.sendFile(path.join(__dirname,'../../frontend/products.html'));

  },

  async registerProduct(req, res) {
    // res.render('index');
    //date fromat
    let fecha_modificacion = new Date().toISOString().slice(0, 10);
    const { usuario_id,nombre, costo, precio, stock, estado } = req.body;

    try {
      producto = {
        usuario_id,
        nombre,
        costo,
        precio,
        stock,
        fecha_modificacion,
        estado,
      };

      await con.query("INSERT INTO producto set ?", [producto]);

      res.json({ producto });
    } catch (error) {
      console.log(error);
    }
  },

  async getProducts(req, res) {
    const id = req.params;
    const user_id = id.user_id;
    console.log("usuario id " ,user_id);
    try {
      const products = await con.query("SELECT * FROM producto WHERE USUARIO_ID = ?", user_id , function (
        error,
        results,
        fields
      ) {
        if (error) throw error;
        return res.json({ results });
      });
    } catch (error) {
      console.log(error);
    }
  },

  async deleteProducts(req, res) {
    const { id_producto } = req.params;
    const changeEstado = "I";
    const parametroDelete = [changeEstado, id_producto];
    try {
      await con.query(
        "UPDATE producto SET ESTADO = ? WHERE PRODUCTO_ID = ?",parametroDelete
        ,
        function (error, results, fields) {
          if (error) throw error;
          console.log("deleted " + results.affectedRows + " rows");
          return res.json({ message: "Product deleted" });
        }
      );
    } catch (error) {
      console.log(error);
    }
  },

  async editProduct(req, res) {
    const { id_producto } = req.params;
    const { nombre, costo, precio, stock, estado } = req.body;
    let fecha_modificacion = new Date().toISOString().slice(0, 10);

    try {
      await con.query(
        "UPDATE producto SET NOMBRE=?,COSTO=?,PRECIO=?,STOCK=?,FECHA_MODIFICACION=?,ESTADO=? WHERE PRODUCTO_ID = ?",
        [nombre, costo, precio, stock, fecha_modificacion, estado, id_producto],
        function (error, results, fields) {
          if (error) throw error;
          return res.json({ results });
        }
      );
    } catch (err) {
      console.log(err);
    }
  },
};
