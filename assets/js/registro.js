const formulario = document.querySelector('#formulario-registro');
const contrasena = document.querySelector('#contrasena');
const confirmarContrasena = document.querySelector('#confirmar-contrasena');
const errorConfirmarContrasena = document.querySelector('#error-confirmar-contrasena');

function validarContrasenas() {
    const coinciden = contrasena.value === confirmarContrasena.value;
    const confirmacionVacia = confirmarContrasena.value.length === 0;

    if (confirmacionVacia) {
        confirmarContrasena.setCustomValidity('Confirma tu contraseña.');
        errorConfirmarContrasena.textContent = '';
        confirmarContrasena.classList.remove('invalido');
        return false;
    }

    if (!coinciden) {
        confirmarContrasena.setCustomValidity('Las contraseñas no coinciden.');
        errorConfirmarContrasena.textContent = 'Las contraseñas no coinciden.';
        confirmarContrasena.classList.add('invalido');
        return false;
    }

    confirmarContrasena.setCustomValidity('');
    errorConfirmarContrasena.textContent = '';
    confirmarContrasena.classList.remove('invalido');
    return true;
}

contrasena.addEventListener('input', validarContrasenas);
confirmarContrasena.addEventListener('input', validarContrasenas);

formulario.addEventListener('submit', (evento) => {
    if (!validarContrasenas()) {
        evento.preventDefault();
        confirmarContrasena.reportValidity();
    }
});
