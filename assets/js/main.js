// Clase Producto y constructor
class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }
}

// Lista para almacenar los productos
let listaProductos = [];

// Obtener referencias a los elementos del formulario
const nombreProductoInput = document.getElementById('input-CargarNombreProducto');
const precioProductoInput = document.getElementById('input-CargarPrecioProducto');
const btnAgregarProd = document.getElementById('btnAgregarProd');
const productosContainer = document.getElementById('productos-container');

// Agregar un evento al formulario para la validación
document.getElementById('form-AgregarProducto').addEventListener('submit', function(event) {
  event.preventDefault();
  AgregarProducto();
});

// Función para validar que los inputs estén completos y agregar el producto
function AgregarProducto() {
  const nombreProducto = nombreProductoInput.value.trim();
  const precioProducto = parseFloat(precioProductoInput.value);

  if (nombreProducto !== '' && !isNaN(precioProducto) && precioProducto >= 0) {
    const producto = new Producto(nombreProducto, precioProducto);
    listaProductos.push(producto);
    CrearHTMLProducto(producto);
    nombreProductoInput.value = '';
    precioProductoInput.value = '';

    guardarProductos();

  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Por favor, complete de manera correcta todos los campos del formulario.',
    })

    nombreProductoInput.value = '';
    precioProductoInput.value = '';
  }
}

// Función para crear el HTML de un producto y mostrarlo en la página
function CrearHTMLProducto(producto) {
  const card = document.createElement('div');
  card.className = 'card';
  card.style.width = '18rem';

  const img = document.createElement('img');
  img.src = 'https://dummyimage.com/600x400/000/fff';
  img.className = 'card-img-top';
  img.alt = '...';
  card.appendChild(img);

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  card.appendChild(cardBody);

  const title = document.createElement('h5');
  title.className = 'card-title';
  title.textContent = producto.nombre;
  cardBody.appendChild(title);

  const price = document.createElement('p');
  price.className = 'card-text';
  price.textContent = `$ ${producto.precio.toFixed(2)}`;
  cardBody.appendChild(price);

  const addToCartButton = document.createElement('button');
  addToCartButton.type = 'button';
  addToCartButton.className = 'btn btn-primary';
  addToCartButton.textContent = 'Añadir al carrito';
  cardBody.appendChild(addToCartButton);

  addToCartButton.addEventListener('click', function () {
    AgregarAlCarrito(producto);
  });

  productosContainer.appendChild(card);
}

// Función para cargar los productos al abrir la página
function cargarProductos() {
  const productosGuardados = localStorage.getItem('productos');
  if (productosGuardados !== '[]' && productosGuardados !== null) {
    listaProductos = JSON.parse(productosGuardados);
    listaProductos.forEach(function (producto) {
      CrearHTMLProducto(producto);
    });
  } else {
    // Cargar productos predeterminados
    listaProductos = [
      { nombre: 'SMART TV SAMSUNG SERIES 7 LED 4K 50"', precio: 80000 },
      { nombre: 'NOTEBOOK DELL INSPIRON 3502', precio: 83599 },
      { nombre: 'CELULAR SAMSUNG A51 128GB', precio: 64000 },
      { nombre: 'MEMORIA RAM FURY BEAST DDR4 8GB', precio: 7300 },
    ];
    listaProductos.forEach(function (producto) {
      CrearHTMLProducto(producto);
    });
    guardarProductos();
  }
}

// Función para guardar la lista de productos en el Local Storage
function guardarProductos() {
  localStorage.setItem('productos', JSON.stringify(listaProductos));
}

// Llamar a la función para cargar los productos al abrir la página
cargarProductos();

// Manejar evento de clic en el botón "Añadir al carrito"
function AgregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem('AlCarrito')) || [];
  carrito.push(producto);
  localStorage.setItem('AlCarrito', JSON.stringify(carrito));
}

