// ========================================
// FORMULARIO DE REGISTRO
// ========================================

const formulario = document.getElementById('formulario-registro');

const run = document.getElementById('run');
const nombre = document.getElementById('nombre');
const apellidos = document.getElementById('apellidos');
const correo = document.getElementById('correo');
const contrasena = document.getElementById('contrasena');
const region = document.getElementById('region');
const comuna = document.getElementById('comuna');
const direccion = document.getElementById('direccion');

const mensajeRegistro = document.getElementById('mensaje-registro');


// ========================================
// RECUPERAR USUARIOS DE LOCALSTORAGE
// ========================================

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];


// ========================================
// FUNCIONES PARA MOSTRAR ESTADOS
// ========================================

function mostrarError(campo, mensaje) {

    const mensajeError =
        document.getElementById(`error-${campo.id}`);

    campo.classList.remove('valido');
    campo.classList.add('invalido');

    if (mensajeError) {
        mensajeError.textContent = mensaje;
    }
}


function mostrarValido(campo) {

    const mensajeError =
        document.getElementById(`error-${campo.id}`);

    campo.classList.remove('invalido');
    campo.classList.add('valido');

    if (mensajeError) {
        mensajeError.textContent = '';
    }
}


function limpiarEstado(campo) {

    const mensajeError =
        document.getElementById(`error-${campo.id}`);

    campo.classList.remove('valido', 'invalido');

    if (mensajeError) {
        mensajeError.textContent = '';
    }
}


// ========================================
// CARGAR REGIONES
// ========================================

function cargarRegiones() {

    regionesComunas.forEach(function (item) {

        const opcion = document.createElement('option');

        opcion.value = item.region;
        opcion.textContent = item.region;

        region.appendChild(opcion);

    });

}

cargarRegiones();


// ========================================
// CARGAR COMUNAS SEGÚN REGIÓN
// ========================================

region.addEventListener('change', function () {

    // Reinicia el selector de comunas.
    comuna.innerHTML =
        '<option value="">Seleccione una comuna</option>';

    const regionSeleccionada =
        regionesComunas.find(function (item) {

            return item.region === region.value;

        });


    // Si no hay región seleccionada,
    // se deshabilita el selector de comuna.
    if (!regionSeleccionada) {

        comuna.disabled = true;

        return;
    }


    // Agrega las comunas correspondientes.
    regionSeleccionada.comunas.forEach(function (nombreComuna) {

        const opcion = document.createElement('option');

        opcion.value = nombreComuna;
        opcion.textContent = nombreComuna;

        comuna.appendChild(opcion);

    });


    comuna.disabled = false;

});


// ========================================
// VALIDACIÓN DEL RUN - MÓDULO 11
// ========================================

function validarRun(valorRun) {

    const runLimpio = valorRun
        .trim()
        .toUpperCase();


    // Debe venir sin puntos ni guion
    // y tener entre 7 y 9 caracteres.
    if (!/^[0-9]{6,8}[0-9K]$/.test(runLimpio)) {

        return false;

    }


    const cuerpo = runLimpio.slice(0, -1);

    const digitoVerificador = runLimpio.slice(-1);

    let suma = 0;

    let multiplicador = 2;


    // Se recorre el RUN de derecha a izquierda.
    for (let i = cuerpo.length - 1; i >= 0; i--) {

        suma += Number(cuerpo[i]) * multiplicador;

        multiplicador++;


        if (multiplicador > 7) {

            multiplicador = 2;

        }

    }


    const resultado = 11 - (suma % 11);

    let digitoCalculado;


    if (resultado === 11) {

        digitoCalculado = '0';

    } else if (resultado === 10) {

        digitoCalculado = 'K';

    } else {

        digitoCalculado = String(resultado);

    }


    return digitoVerificador === digitoCalculado;

}


// ========================================
// VALIDACIÓN DEL CAMPO RUN
// ========================================

function validarCampoRun() {

    const valor = run.value.trim();


    if (valor === '') {

        mostrarError(
            run,
            'El RUN es obligatorio.'
        );

        return false;

    }


    if (valor.length < 7 || valor.length > 9) {

        mostrarError(
            run,
            'El RUN debe tener entre 7 y 9 caracteres.'
        );

        return false;

    }


    if (!validarRun(valor)) {

        mostrarError(
            run,
            'El RUN ingresado no es válido.'
        );

        return false;

    }


    mostrarValido(run);

    return true;

}


// ========================================
// VALIDACIÓN DEL NOMBRE
// ========================================

function validarNombre() {

    const valor = nombre.value.trim();


    if (valor === '') {

        mostrarError(
            nombre,
            'El nombre es obligatorio.'
        );

        return false;

    }


    if (valor.length > 50) {

        mostrarError(
            nombre,
            'El nombre no puede superar los 50 caracteres.'
        );

        return false;

    }


    mostrarValido(nombre);

    return true;

}


// ========================================
// VALIDACIÓN DE APELLIDOS
// ========================================

function validarApellidos() {

    const valor = apellidos.value.trim();


    if (valor === '') {

        mostrarError(
            apellidos,
            'Los apellidos son obligatorios.'
        );

        return false;

    }


    if (valor.length > 100) {

        mostrarError(
            apellidos,
            'Los apellidos no pueden superar los 100 caracteres.'
        );

        return false;

    }


    mostrarValido(apellidos);

    return true;

}


// ========================================
// VALIDACIÓN DEL CORREO
// ========================================

function validarCorreo() {

    const valor = correo.value.trim();

    const expresionCorreo =
        /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;


    if (valor === '') {

        mostrarError(
            correo,
            'El correo es obligatorio.'
        );

        return false;

    }


    if (valor.length > 100) {

        mostrarError(
            correo,
            'El correo no puede superar los 100 caracteres.'
        );

        return false;

    }


    if (!expresionCorreo.test(valor)) {

        mostrarError(
            correo,
            'Use un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.'
        );

        return false;

    }


    mostrarValido(correo);

    return true;

}


// ========================================
// VALIDACIÓN DE CONTRASEÑA
// ========================================

function validarContrasena() {

    const valor = contrasena.value;


    if (valor === '') {

        mostrarError(
            contrasena,
            'La contraseña es obligatoria.'
        );

        return false;

    }


    if (valor.length < 4 || valor.length > 10) {

        mostrarError(
            contrasena,
            'La contraseña debe tener entre 4 y 10 caracteres.'
        );

        return false;

    }


    mostrarValido(contrasena);

    return true;

}


// ========================================
// VALIDACIÓN DE DIRECCIÓN
// ========================================

function validarDireccion() {

    const valor = direccion.value.trim();


    if (valor === '') {

        mostrarError(
            direccion,
            'La dirección es obligatoria.'
        );

        return false;

    }


    if (valor.length > 300) {

        mostrarError(
            direccion,
            'La dirección no puede superar los 300 caracteres.'
        );

        return false;

    }


    mostrarValido(direccion);

    return true;

}


// ========================================
// VALIDACIÓN EN TIEMPO REAL
// ========================================

run.addEventListener(
    'input',
    validarCampoRun
);

nombre.addEventListener(
    'input',
    validarNombre
);

apellidos.addEventListener(
    'input',
    validarApellidos
);

correo.addEventListener(
    'input',
    validarCorreo
);

contrasena.addEventListener(
    'input',
    validarContrasena
);

direccion.addEventListener(
    'input',
    validarDireccion
);


// ========================================
// ENVÍO DEL FORMULARIO
// ========================================

formulario.addEventListener(
    'submit',
    function (evento) {

        // Evita que el formulario
        // recargue la página.
        evento.preventDefault();


        const runCorrecto =
            validarCampoRun();

        const nombreCorrecto =
            validarNombre();

        const apellidosCorrectos =
            validarApellidos();

        const correoCorrecto =
            validarCorreo();

        const contrasenaCorrecta =
            validarContrasena();

        const direccionCorrecta =
            validarDireccion();


        // Si algún campo obligatorio tiene error,
        // se detiene el registro.
        if (
            !runCorrecto ||
            !nombreCorrecto ||
            !apellidosCorrectos ||
            !correoCorrecto ||
            !contrasenaCorrecta ||
            !direccionCorrecta
        ) {

            mensajeRegistro.textContent =
                'Revise los campos antes de continuar.';

            mensajeRegistro.classList.remove('exito');

            mensajeRegistro.classList.add('error');

            return;

        }


        // ========================================
        // CREAR OBJETO USUARIO
        // ========================================

        const nuevoUsuario = {

            run: run.value
                .trim()
                .toUpperCase(),

            nombre: nombre.value.trim(),

            apellidos: apellidos.value.trim(),

            correo: correo.value.trim(),

            contrasena: contrasena.value,

            region: region.value,

            comuna: comuna.value,

            direccion: direccion.value.trim()

        };


        // ========================================
        // GUARDAR EN LOCALSTORAGE
        // ========================================

        usuarios.push(nuevoUsuario);

        localStorage.setItem(
            'usuarios',
            JSON.stringify(usuarios)
        );


        // ========================================
        // MENSAJE DE REGISTRO EXITOSO
        // ========================================

        mensajeRegistro.textContent =
            'Usuario registrado correctamente.';

        mensajeRegistro.classList.remove('error');

        mensajeRegistro.classList.add('exito');


        // ========================================
        // LIMPIAR FORMULARIO
        // ========================================

        formulario.reset();

        limpiarEstado(run);
        limpiarEstado(nombre);
        limpiarEstado(apellidos);
        limpiarEstado(correo);
        limpiarEstado(contrasena);
        limpiarEstado(direccion);


        // Reiniciar comuna después del registro.
        comuna.innerHTML =
            '<option value="">Seleccione una comuna</option>';

        comuna.disabled = true;

    }
);