
const form = document.getElementById('FormProducts');

const registerData = (e)=>{
    
    e.preventDefault();

    const nombre = document.getElementById("Pnombre").value;
    const costo = document.getElementById("Pcosto").value;
    const precio = document.getElementById("Pprecio").value;
    const stock = document.getElementById("Pstock").value;
    const estado = document.getElementById("pestado").value;

    console.log(nombre , costo,precio,stock,estado);


    // ajax 
    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8000/products/resgister",true);
    request.setRequestHeader("Content-type", "application/json");
    request.onreadystatechange = function() {
        // Check if the request is compete and was successful
        if(this.readyState === 4 && this.status === 200) {
            let response = this.responseText;
            console.log("respuesta http " , response);
        }
    };

    const product = {
        nombre, 
        costo,
        precio,
        stock,
        estado
    }

    request.send(JSON.stringify(product));

}

form.addEventListener('submit' , registerData);