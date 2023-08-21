

class Tienda{
    constructor(nombre, precio, stock){
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

let finCompra = document.getElementById("fincompra");
let vaCompra = document.getElementById("vacompra");
let contProd = document.getElementById("prod-carrito");

let puedeComprar = false;

function mostrarBotonesCompra(){
  if(puedeComprar){
    finCompra.style.display = "block";
    vaCompra.style.display = "block";
  } else {
    finCompra.style.display = "none";
    vaCompra.style.display = "none";
  }
}

let listaCarrito = [];

function VaciarCarrito(){
    localStorage.removeItem("carrito");
    puedeComprar = false;
    mostrarBotonesCompra();
    contProd.innerHTML = "";
}

function CompraExitosa(){
    localStorage.removeItem("carrito");
    puedeComprar = false;
    alert("muy linda la compra pero junte mas algodon");
    mostrarBotonesCompra();
    contProd.innerHTML = "";
}

if(!localStorage.getItem("carrito")){
    alert("Muy negro y vacio como un zoom x 100 a un negro");
}else{
  puedeComprar = true;
  mostrarBotonesCompra();
}

carrito = localStorage.getItem("carrito");

document.addEventListener("DOMContentLoaded", () => {
  const prod = JSON.parse(localStorage.getItem("carrito")) || [];
  prod.forEach((carrito, index) => {
  const Tarjeta = `
    <div class="card" id="producto-${index + 1}" style="width: 18rem;">
      <img src="./assets/img/nego.jpg" class="card-img-top" alt="">
      <div class="card-body">
        <h4 class="card-title">${carrito.nombre}</h4>
        <h5 class="card-price">${carrito.precio}</h5>
        <p class="card-stock">${carrito.stock}</p>
      </div>
    </div>
  `;
  contProd.innerHTML += Tarjeta;
  });
});

vaCompra.onclick = (e) => {
  e.preventDefault();
  VaciarCarrito();
}

finCompra.onclick = (e) =>{
  e.preventDefault();
  CompraExitosa();
}