// ========================================
// MENÚ HAMBURGUESA (RESPONSIVE)
// ========================================

const menuToggle = document.querySelector('.menu-toggle');
const navPrincipal = document.querySelector('.nav-principal');


function alternarMenu() {

    const estaAbierto = navPrincipal.classList.toggle('is-open');

    menuToggle.setAttribute('aria-expanded', String(estaAbierto));

}


function cerrarMenu() {

    navPrincipal.classList.remove('is-open');

    menuToggle.setAttribute('aria-expanded', 'false');

}


if (menuToggle && navPrincipal) {

    menuToggle.addEventListener('click', alternarMenu);


    // Al hacer clic en un enlace del menú,
    // se cierra automáticamente (útil en pantallas pequeñas).
    const enlacesMenu = navPrincipal.querySelectorAll('a');

    for (const enlace of enlacesMenu) {

        enlace.addEventListener('click', cerrarMenu);

    }

}
