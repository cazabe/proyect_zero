import ajax from "./ajax.js";
const form = document.getElementById("FormProducts");
const tableProducts = document.getElementById("table_products");

// const deleteProduct = (id) => {
//   alert(id);
// };



window.editProducts = function(tag){
const jsonData = JSON.parse(tag.dataset.products);
console.log(jsonData.NOMBRE);

}


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
      `<button class="btn btn-danger" onclick="deleteProducts(${product.PRODUCTO_ID})">Borrar</button> <button class="btn btn-warning" onclick="editProducts(this)" data-products=\'${JSON.stringify(product)}'\>Editar</button>` +
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
};

// Delete producst
window.deleteProducts = (id)=>{
  ajax(
    `http://localhost:8000/products/${id}`,
    null,
    "PUT",
    [["Content-type", "application/json"]],
    deleteProductsResponse,
    deleteProductsResponse
  );
  getDataProducts();
}




//events
form.addEventListener("submit", registerData);

