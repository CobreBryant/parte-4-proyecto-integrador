class Producto{
  constructor(nombre, precio, stock){
      this.nombre = nombre;
      this.precio = precio;
      this.stock = stock;
  }
}

let listaProductos = [];


if(!localStorage.getItem("prodcutos")){
  listaProductos = [
    { nombre: "Bajo", precio: 20000, stock: 200 },
    { nombre: "Chain", precio: 2000000, stock: 100 },
    { nombre: "Miles jordan", precio: 65000, stock: 100 },
  ];
  localStorage.setItem("prodcutos", JSON.stringify(listaProductos));
}else{
  listaProductos = JSON.parse(localStorage.getItem("prodcutos"))
}

function Agregar() {
    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precio").value;
    let stock = document.getElementById("stock").value;
    if (isNaN(precio) && isNaN(stock)){
        alert("Solo numeros *ruidos de latigo*.");
    }
    else{
        if(isNaN(precio)){
          alert("Solo numeros *ruidos de latigo*.");
        }
        else{
            if(isNaN(stock)){
              alert("Solo numeros *ruidos de latigo*.");
            }
        }
    }
    
    if (nombre !== "" && precio !== "" && stock !== "" && !isNaN(precio) && !isNaN(stock)){
      let busqueda = JSON.parse(localStorage.getItem("prodcutos"));
      let index = busqueda.length
        let prod = new Producto(nombre, precio, stock);
        const Tarjeta = `
        <div class="card" id="producto-${index + 1}" style="width: 18rem;">
          <img src="./assets/img/nego.jpg" class="card-img-top" alt="">
          <div class="card-body">
            <h4 class="card-title">${prod.nombre}</h4>
            <h5 class="card-price">$${prod.precio}</h5>
            <p class="card-stock">${prod.stock}</p>
            <a class="btn btn-producto" data-producto="${index + 1}" id="botonCom${index}">Coooooompre!!</a>
          </div>
        </div>
      `;
        
        const contProdu = document.getElementById("prod");
        contProdu.innerHTML += Tarjeta;
        listaProductos.push(prod);
        localStorage.setItem("prodcutos", JSON.stringify(listaProductos))
  
        let lista = document.createElement("p");
  
        document.getElementById("prods").appendChild(lista);
  
        document.getElementById("nombre").value = "";
        document.getElementById("precio").value = "";
        document.getElementById("stock").value = "";
        alCarrito();
    }
    
    if(nombre == "" || precio == "" || stock == ""){
        alert("Complete bien el formulario *ruido de latigo*.")
    }   
  }

  function Guardar(){
    document.addEventListener("DOMContentLoaded", () => {
      const prod = JSON.parse(localStorage.getItem("prodcutos")) || [];
      const contProd = document.getElementById("prod");
      prod.forEach((producto, index) => {
      const Tarjeta = `
        <div class="card" id="producto-${index + 1}" style="width: 18rem;">
          <img src="./assets/img/nego.jpg" class="card-img-top" alt="">
          <div class="card-body">
            <h4 class="card-title">${producto.nombre}</h4>
            <h5 class="card-price">$${producto.precio}</h5>
            <p class="card-stock">${producto.stock}</p>
            <a class="btn btn-producto" data-producto="${index + 1}" id="botonCom${index}">Coooooompre!!</a>
          </div>
        </div>
      `;
      contProd.innerHTML += Tarjeta;
      });
    });
  }

  Guardar()
  let botonConfirmar = document.getElementById("botonCon");
  botonConfirmar.onclick = (e) =>{
  e.preventDefault()
  Agregar()
};

///Carrito///
function alCarrito(){
  let botones = document.querySelectorAll(".btn-producto"); //trae un array
  for (let boton of botones) {
    boton.onclick = (e) => {
      agregarCarrito(e);
    };
  }
  
  let carrito = [];
  
  function agregarCarrito(e) {
    let elemento = e.target;
    let padre = elemento.parentElement;
    let nombre = padre.querySelector("h4").innerText;
    let precio = padre.querySelector("h5").innerText;
    let stock = padre.querySelector("p").innerText;
    let prodcuto = {
      nombre: nombre,
      precio: precio,
      stock: stock
    }
    console.log(prodcuto);
    carrito.push(prodcuto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

}
setTimeout(() => {
  alCarrito();
}, 500);

