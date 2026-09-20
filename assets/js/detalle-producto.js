// ========================================
// DETALLE DINÁMICO DE UN PRODUCTO
// El código del producto a mostrar se guarda en
// localStorage cuando el usuario hace clic en una
// tarjeta de productos.html (ver productos.js).
// ========================================

const contenedorDetalle = document.getElementById('detalle-producto');

const codigoSeleccionado = localStorage.getItem('productoSeleccionado');

const producto = codigoSeleccionado
    ? buscarProductoPorCodigo(codigoSeleccionado)
    : null;


function crearFilaEspecificacion(etiqueta, valor) {

    const fila = document.createElement('div');

    const termino = document.createElement('dt');
    termino.textContent = etiqueta;

    const definicion = document.createElement('dd');
    definicion.textContent = valor;

    fila.appendChild(termino);
    fila.appendChild(definicion);

    return fila;

}


function mostrarProductoNoEncontrado() {

    const aviso = document.createElement('p');

    aviso.classList.add('mensaje-registro', 'error');
    aviso.textContent = 'No se encontró el producto seleccionado. Vuelve a la página de productos e inténtalo nuevamente.';

    contenedorDetalle.replaceChildren(aviso);

}


function mostrarProducto() {

    // ---- Imagen ----

    const contenedorImagen = document.createElement('div');
    contenedorImagen.classList.add('detalle-producto-imagen');

    if (producto.imagen) {

        const imagen = document.createElement('img');

        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;

        contenedorImagen.appendChild(imagen);

    } else {

        const marcador = document.createElement('div');

        marcador.classList.add('marcador-imagen-producto', 'marcador-imagen-producto-grande');

        contenedorImagen.appendChild(marcador);

    }


    // ---- Contenido ----

    const contenedorContenido = document.createElement('div');
    contenedorContenido.classList.add('detalle-producto-contenido');

    const etiquetaCategoria = document.createElement('p');
    etiquetaCategoria.classList.add('etiqueta-producto');
    etiquetaCategoria.textContent = producto.categoria;

    const titulo = document.createElement('h1');
    titulo.id = 'titulo-producto';
    titulo.textContent = producto.nombre;

    const descripcion = document.createElement('p');
    descripcion.classList.add('descripcion-producto');
    descripcion.textContent = producto.descripcion;

    const precio = document.createElement('p');
    precio.classList.add('precio-producto');
    precio.textContent = formatearPrecio(producto.precio);

    const estado = document.createElement('p');
    estado.classList.add('estado-producto');

    if (producto.stock > 0) {

        estado.textContent = 'Disponible para despacho';

    } else {

        estado.textContent = 'Sin stock disponible';

    }

    contenedorContenido.appendChild(etiquetaCategoria);
    contenedorContenido.appendChild(titulo);
    contenedorContenido.appendChild(descripcion);
    contenedorContenido.appendChild(precio);
    contenedorContenido.appendChild(estado);


    // ---- Alerta de stock crítico ----

    if (producto.stock > 0 && producto.stock <= producto.stockMinimo) {

        const alerta = document.createElement('p');

        alerta.classList.add('mensaje-registro', 'error');
        alerta.textContent = `¡Quedan pocas unidades! Stock crítico: ${producto.stock} disponibles.`;

        contenedorContenido.appendChild(alerta);

    }


    // ---- Especificaciones ----

    const seccionEspecificaciones = document.createElement('section');
    seccionEspecificaciones.classList.add('especificaciones-producto');

    const tituloEspecificaciones = document.createElement('h2');
    tituloEspecificaciones.textContent = 'Especificaciones';

    const listaDefiniciones = document.createElement('dl');

    listaDefiniciones.appendChild(crearFilaEspecificacion('Código', producto.codigo));
    listaDefiniciones.appendChild(crearFilaEspecificacion('Marca', producto.marca));
    listaDefiniciones.appendChild(crearFilaEspecificacion('Categoría', producto.categoria));
    listaDefiniciones.appendChild(crearFilaEspecificacion('Unidad de venta', producto.unidad));
    listaDefiniciones.appendChild(crearFilaEspecificacion('Stock disponible', `${producto.stock} unidades`));

    seccionEspecificaciones.appendChild(tituloEspecificaciones);
    seccionEspecificaciones.appendChild(listaDefiniciones);

    contenedorContenido.appendChild(seccionEspecificaciones);


    // ---- Mostrar todo en la página ----

    contenedorDetalle.replaceChildren(contenedorImagen, contenedorContenido);


    const rutaActual = document.getElementById('ruta-producto-actual');

    if (rutaActual) {

        rutaActual.textContent = producto.nombre;

    }

    document.title = `${producto.nombre} | Ferretería Los Maestros`;

}


if (producto === null) {

    mostrarProductoNoEncontrado();

} else {

    mostrarProducto();

}
