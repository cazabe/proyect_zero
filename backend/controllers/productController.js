const con = require("../dbConnector");

module.exports = {
  async getView() {

    res.sendFile(path.join(__dirname,'../../frontend/products.html'));

  },

  async registerProduct(req, res) {
    // res.render('index');
    //date fromat
    let fecha_modificacion = new Date().toISOString().slice(0, 10);

    const { nombre, costo, precio, stock, estado } = req.body;

    try {
      producto = {
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
    try {
      const products = await con.query("SELECT * FROM producto", function (
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
    try {
      await con.query(
        "DELETE FROM producto WHERE PRODUCTO_ID = ?",
        id_producto,
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
