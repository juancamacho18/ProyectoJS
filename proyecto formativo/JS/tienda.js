// PRODUCTOS
const productos = [
    // Herramientas
    {
        id: "herramienta-01",
        titulo: "Pinzas",
        imagen: "../IMAGENES/pinzas.png",
        categoria: {
            nombre: "herramientas",
            id: "herramientas"
        },
        precio: 17000
    },
    {
        id: "herramienta-02",
        titulo: "Motosierra",
        imagen: "../IMAGENES/motosierra.jpg",
        categoria: {
            nombre: "herramientas",
            id: "herramientas"
        },
        precio: 50000
    },
    {
        id: "herramienta-03",
        titulo: "Llave inglesa",
        imagen: "../IMAGENES/llave.jpg",
        categoria: {
            nombre: "herramientas",
            id: "herramientas"
        },
        precio: 15000
    },
    {
        id: "herramienta-04",
        titulo: "Pulidora",
        imagen: "../IMAGENES/pulidora.jpg",
        categoria: {
            nombre: "herramientas",
            id: "herramientas"
        },
        precio: 75000
    },
    {
        id: "herramienta-05",
        titulo: "Martillo",
        imagen: "../IMAGENES/martillo.jpg",
        categoria: {
            nombre: "herramientas",
            id: "herramientas"
        },
        precio: 15000
    },
    {
        id: "herramienta-06",
        titulo: "Par de guantes",
        imagen: "../IMAGENES/guantes.jpg" ,
        categoria: {
            nombre: "herramientas",
            id: "herramientas"
        },
        precio: 10000
    },
    {
        id: "herramienta-07",
        titulo: "Espatula",
        imagen: "../IMAGENES/espatula.jpg",
        categoria: {
            nombre: "herramientas",
            id: "herramientas"
        },
        precio: 15000
    },
    {
        id: "herramienta-08",
        titulo: "Set de destornilladores",
        imagen: "../IMAGENES/destornillador.jpg",
        categoria: {
            nombre: "herramientas",
            id: "herramientas"
        },
        precio: 30000
    },
    // Materiales
    {
        id: "materiales-01",
        titulo: "Pinturas",
        imagen: "../IMAGENES/pintura.jpg",
        categoria: {
            nombre: "Materiales",
            id: "materiales"
        },
        precio: 35000
    },
    {
        id: "materiales-02",
        titulo: "Cemento",
        imagen: "../IMAGENES/cementos.jpg",
        categoria: {
            nombre: "Materiales",
            id: "materiales"
        },
        precio: 45000
    },
    {
        id: "materiales-03",
        titulo: "Vidrios",
        imagen: "../IMAGENES/cristal.jpg",
        categoria: {
            nombre: "Materiales",
            id: "materiales"
        },
        precio: 50000
    },
    {
        id: "materiales-04",
        titulo: "Madera",
        imagen: "../IMAGENES/madera.jpg",
        categoria: {
            nombre: "Materiales",
            id: "materiales"
        },
        precio: 25000
    },
    // Construccion
    {
        id: "construcion-01",
        titulo: "Lladrillos",
        imagen: "../IMAGENES/ladrillos.png",
        categoria: {
            nombre: "construccion",
            id: "construccion"
        },
        precio: 40000
    },
    {
        id: "construccion-02",
        titulo: "Tubos de aluminio",
        imagen: "../IMAGENES/tubos.jpg",
        categoria: {
            nombre: "construccion",
            id: "construccion"
        },
        precio: 35000
    },
    {
        id: "construccion-03",
        titulo: "Tejas",
        imagen: "../IMAGENES/tejas.jpg",
        categoria: {
            nombre: "construccion",
            id: "construccion"
        },
        precio: 25000
    },
    {
        id: "construccion-04",
        titulo: "Barras corrugadas",
        imagen: "../IMAGENES/barras.jpg",
        categoria: {
            nombre: "construccion",
            id: "construccion"
        },
        precio: 37000
    },
    {
        id: "construccion-05",
        titulo: "Mezcladora",
        imagen: "../IMAGENES/mezcladora.jpg",
        categoria: {
            nombre: "construccion",
            id: "construccion"
        },
        precio: 65000
    }
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}