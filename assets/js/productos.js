// ========================================
// RENDERIZADO DE TARJETAS DE PRODUCTO
// Se usa tanto en la vitrina de "Productos
// destacados" del Home como en productos.html
// ========================================

function guardarProductoSeleccionado(codigo) {

    localStorage.setItem('productoSeleccionado', codigo);

}


function crearTarjetaProducto(producto) {

    const articulo = document.createElement('article');
    articulo.classList.add('tarjeta-producto');


    // Imagen (o marcador si el producto no tiene foto)

    const enlaceImagen = document.createElement('a');
    enlaceImagen.href = 'detalle-producto.html';

    enlaceImagen.addEventListener('click', function () {

        guardarProductoSeleccionado(producto.codigo);

    });

    if (producto.imagen) {

        const imagen = document.createElement('img');

        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;

        enlaceImagen.appendChild(imagen);

    } else {

        const marcador = document.createElement('div');

        marcador.classList.add('marcador-imagen-producto');

        enlaceImagen.appendChild(marcador);

    }

    articulo.appendChild(enlaceImagen);


    // Título

    const titulo = document.createElement('h3');
    const enlaceTitulo = document.createElement('a');

    enlaceTitulo.href = 'detalle-producto.html';
    enlaceTitulo.textContent = producto.nombre;

    enlaceTitulo.addEventListener('click', function () {

        guardarProductoSeleccionado(producto.codigo);

    });

    titulo.appendChild(enlaceTitulo);
    articulo.appendChild(titulo);


    // Categoría y precio

    const infoProducto = document.createElement('div');
    infoProducto.classList.add('informacion-producto');

    const categoria = document.createElement('span');
    categoria.textContent = producto.categoria;

    const precio = document.createElement('strong');
    precio.textContent = formatearPrecio(producto.precio);

    infoProducto.appendChild(categoria);
    infoProducto.appendChild(precio);

    articulo.appendChild(infoProducto);


    return articulo;

}


function mostrarMensajeProductos(texto) {

    const mensaje = document.getElementById('mensaje-productos');

    if (!mensaje) {

        return;

    }

    mensaje.textContent = texto;
    mensaje.classList.remove('error');
    mensaje.classList.add('exito');

}


function mostrarProductos(lista, contenedor) {

    contenedor.replaceChildren();

    for (const producto of lista) {

        const tarjeta = crearTarjetaProducto(producto);
        contenedor.appendChild(tarjeta);

    }

}


// ========================================
// RENDERIZAR SEGÚN LA PÁGINA ACTUAL
// ========================================

const contenedorDestacados = document.getElementById('lista-destacados');
   

/*
    los productos destacados fueron agregados segun categoria, esto por la falta de metricas
    para destacar los mas vendidos en x tiempo.
    cuando se tenga la informacion de ventas, se podra hacer un filtro para mostrar los mas vendidos en el home.
*/
if (contenedorDestacados) {

    const productosDestacados = [];
    const categoriasDestacadas = [];

    for (const producto of productos) {

        if (!categoriasDestacadas.includes(producto.categoria)) {

            categoriasDestacadas.push(producto.categoria);
            productosDestacados.push(producto);

        }

    }

    mostrarProductos(productosDestacados, contenedorDestacados);

}


const contenedorProductos = document.getElementById('lista-productos');

if (contenedorProductos) {

    mostrarProductos(productos, contenedorProductos);

}


// ========================================
// FILTRO POR CATEGORÍA (solo en productos.html)
// ========================================

function obtenerCategoriasUnicas() {

    const categorias = [];

    for (const producto of productos) {

        let yaExiste = false;

        for (const categoria of categorias) {

            if (categoria === producto.categoria) {

                yaExiste = true;
                break;

            }

        }

        if (!yaExiste) {

            categorias.push(producto.categoria);

        }

    }

    return categorias;

}


function cargarFiltroCategorias(selectElemento) {

    const categorias = obtenerCategoriasUnicas();

    for (const categoria of categorias) {

        const opcion = document.createElement('option');

        opcion.value = categoria;
        opcion.textContent = categoria;

        selectElemento.appendChild(opcion);

    }

}


function filtrarPorCategoria(categoria) {

    if (categoria === '') {

        return productos;

    }

    const resultado = [];

    for (const producto of productos) {

        if (producto.categoria === categoria) {

            resultado.push(producto);

        }

    }

    return resultado;

}


const filtroCategoria = document.getElementById('filtro-categoria');

if (filtroCategoria && contenedorProductos) {

    cargarFiltroCategorias(filtroCategoria);

    filtroCategoria.addEventListener('change', function () {

        const listaFiltrada = filtrarPorCategoria(filtroCategoria.value);

        mostrarProductos(listaFiltrada, contenedorProductos);

        mostrarMensajeProductos(`Mostrando ${listaFiltrada.length} producto(s).`);

    });

}