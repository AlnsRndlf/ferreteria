document.addEventListener('DOMContentLoaded', () => {

    const actividades = [
    {
        id: 1,
        titulo: "Capacitación en Instalaciones Sanitarias y Gasfitería PPR",
        categoria: "gasfiteria",
        imagen: "assets/img/taller-gasfiteria.jpg",
        cupos: 15,
        critico: false
    },
    {
        id: 2,
        titulo: "Taller Uso Seguro de Herramientas Eléctricas Makita",
        categoria: "herramientas",
        imagen: "assets/img/taller-herramientas.jpg",
        cupos: 3,
        critico: true
    },
    {
        id: 3,
        titulo: "Demostración de Nuevos Adhesivos y Morteros para Obra",
        categoria: "construccion",
        imagen: "assets/img/taller-construccion.jpg",
        cupos: 0,
        critico: false   
    },
    {
        id: 4,
        titulo: "Seminario de Normativa Eléctrica Residencial y Tableros",
        categoria: "electricidad",
        imagen: "assets/img/taller-electricidad.jpg",
        cupos: 8,
        critico: false
    },
    {
        id: 5,
        titulo: "Certificación en Armado de Tabiques y Volcanita",
        categoria: "construccion",
        imagen: "assets/img/taller-volcanita.jpg",
        cupos: 2,
        critico: true
    }
];
    const contenedorGrilla = document.querySelector('.grilla-productos');
    const selectCategoria = document.getElementById('filtro-categoria');
    const checkCupos = document.getElementById('filtro-cupos');

    function renderizarCartelera(lista) {
        if (!contenedorGrilla) return;
        
        contenedorGrilla.innerHTML = '';

        if (lista.length === 0) {
            contenedorGrilla.innerHTML = '<p class="centrado">No se encontraron actividades disponibles con los filtros seleccionados.</p>';
            return;
        }

        lista.forEach(item => {
            const tarjeta = document.createElement('article');
            
            // Reutiliza la clase definida por mi compañero y agrega borde especial si los cupos son criticos
            tarjeta.className = `tarjeta-producto ${item.critico && item.cupos > 0 ? 'cupos-criticos' : ''}`;

            const estadoTexto = item.cupos > 0 
                ? `<span class="estado-disponible">Cupos disponibles: <strong>${item.cupos}</strong></span>` 
                : `<span class="estado-agotado">Agotado</span>`;

            tarjeta.innerHTML = `
                <img src="${item.imagen}" alt="${item.titulo}">
                <h3><a href="#">${item.titulo}</a></h3>
                <div class="informacion-producto">
                    ${estadoTexto}
                </div>
            `;

            contenedorGrilla.appendChild(tarjeta);
        });
    }

    function aplicarFiltros() {
        const categoriaSeleccionada = selectCategoria ? selectCategoria.value : 'todas';
        const soloDisponibles = checkCupos ? checkCupos.checked : false;

        const resultado = actividades.filter(item => {
            const coincideCategoria = categoriaSeleccionada === 'todas' || item.categoria === categoriaSeleccionada;
            const coincideCupos = soloDisponibles ? item.cupos > 0 : true;
            
            return coincideCategoria && coincideCupos;
        });

        renderizarCartelera(resultado);
    }

    if (selectCategoria) {
        selectCategoria.addEventListener('change', aplicarFiltros);
    }

    if (checkCupos) {
        checkCupos.addEventListener('change', aplicarFiltros);
    }

    renderizarCartelera(actividades);
});
