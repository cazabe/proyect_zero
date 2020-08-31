import ajax from "./ajax.js";
const form = document.getElementById("FormProducts");
const formEdit = document.getElementById("FormProductsEdit");
const tableProducts = document.getElementById("table_products");

// const deleteProduct = (id) => {
//   alert(id);
// };

window.editProducts = function (tag) {
  const jsonData = JSON.parse(tag.dataset.products);
  console.log(jsonData.NOMBRE);
  
  document.getElementById("id01").style.display = "block";
  document.getElementById("PnombreEdit").value = jsonData.NOMBRE;
  document.getElementById("PcostoEdit").value = jsonData.COSTO;
  document.getElementById("PprecioEdit").value = jsonData.PRECIO;
  document.getElementById("PstockEdit").value = jsonData.STOCK;
  document.getElementById("pestadoEdit").value = jsonData.ESTADO;
  document.getElementById("idProductEdir").value = jsonData.PRODUCTO_ID;
  
};

const getDataProducts = () => {
  ajax(
    "http://localhost:8000/products/show",
    null,
    "GET",
    [["Content-type", "application/json"]],
    tableProductsResponse,
    tableProductsResponse
  );
};

window.onload = function () {
  getDataProducts();
};

//Ajax function GET
const tableProductsResponse = (res) => {
  const products = JSON.parse(res);
  console.log(products.results);
  console.log(products.results.length);
  let tr = "";
  products.results.map((product) => {
    tr +=
      "<tr><td>" +
      product.NOMBRE +
      "</td><td>" +
      product.COSTO +
      "</td><td>" +
      product.PRECIO +
      "</td><td>" +
      product.STOCK +
      "</td><td>" +
      product.ESTADO +
      "</td><td>" +
      `<button class="btn btn-danger" onclick="deleteProducts(${
        product.PRODUCTO_ID
      })"><img class = "trashIcon" src="../img/trash.png"/></button> <button class="btn btn-warning" onclick="editProducts(this)" data-products=\'${JSON.stringify(
        product
      )}'\><img class = "trashIcon" src="../img/edit.png"/></button>` +
      "</td></tr>";
    tableProducts.innerHTML = tr;
  });
};


//callback fuunctions
const deleteProductsResponse = (res) => {
  console.log(res);
};

const registerProductsResponse = (res) => {
  console.log(res);
};

//Ajax function POST
const registerData = (e) => {
  e.preventDefault();

  const nombre = document.getElementById("Pnombre").value;
  const costo = document.getElementById("Pcosto").value;
  const precio = document.getElementById("Pprecio").value;
  const stock = document.getElementById("Pstock").value;
  const estado = document.getElementById("pestado").value;

  console.log(nombre, costo, precio, stock, estado);

  const product = {
    nombre,
    costo,
    precio,
    stock,
    estado,
  };

  ajax(
    "http://localhost:8000/products/resgister",
    product,
    "POST",
    [["Content-type", "application/json"]],
    registerProductsResponse,
    registerProductsResponse
  );
  getDataProducts();
  alert("Producto registrado correctamente");
};

const editDataProducts = () => {
  const id_producto = document.getElementById("idProductEdir").value
  const nombre = document.getElementById("PnombreEdit").value;
  const costo = document.getElementById("PcostoEdit").value;
  const precio = document.getElementById("PprecioEdit").value;
  const stock = document.getElementById("PstockEdit").value;
  const estado = document.getElementById("pestadoEdit").value;

  console.log("id en edit modal " ,id_producto )

  const editProducts = {
    nombre,
    costo,
    precio,
    stock,
    estado
  }
  ajax(
    `http://localhost:8000/products/edit/${id_producto}`,
    editProducts,
    "PUT",
    [["Content-type", "application/json"]],
    registerProductsResponse,
    registerProductsResponse
  );
};

// Delete producst
window.deleteProducts = (id) => {
  ajax(
    `http://localhost:8000/products/${id}`,
    null,
    "PUT",
    [["Content-type", "application/json"]],
    deleteProductsResponse,
    deleteProductsResponse
  );
  alert("Producto eliminado");
  getDataProducts();
};

//events
form.addEventListener("submit", registerData);
formEdit.addEventListener("submit", editDataProducts);
