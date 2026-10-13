import { guardarDatos, leerDatos } from "../utils/persistencia";

const CLAVE_LOCALSTORAGE = "usuarios";

function leerUsuariosGuardados() {
  return leerDatos(CLAVE_LOCALSTORAGE, []);
}

function guardarUsuarios(listaUsuarios) {
  guardarDatos(CLAVE_LOCALSTORAGE, listaUsuarios);
}


// ========================================
// LEER (Read)
// ========================================

export function obtenerUsuarios() {
  return leerUsuariosGuardados();
}

export function obtenerUsuarioPorRun(run) {
  const usuarios = leerUsuariosGuardados();
  return usuarios.find((usuario) => usuario.run === run) || null;
}


// ========================================
// CREAR (Create)
// ========================================

export function crearUsuario(nuevoUsuario) {
  const usuarios = leerUsuariosGuardados();
  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);
  return nuevoUsuario;
}


// ========================================
// ACTUALIZAR (Update)
// ========================================

export function actualizarUsuario(run, datosNuevos) {
  const usuarios = leerUsuariosGuardados();
  const indice = usuarios.findIndex((usuario) => usuario.run === run);

  if (indice === -1) {
    return null;
  }

  usuarios[indice] = { ...usuarios[indice], ...datosNuevos };
  guardarUsuarios(usuarios);
  return usuarios[indice];
}


// ========================================
// ELIMINAR (Delete)
// ========================================

export function eliminarUsuario(run) {
  const usuarios = leerUsuariosGuardados();
  const indice = usuarios.findIndex((usuario) => usuario.run === run);

  if (indice === -1) {
    return false;
  }

  usuarios.splice(indice, 1);
  guardarUsuarios(usuarios);
  return true;
}


// ========================================
// AUTENTICACIÓN SIMULADA
// El login real usaría un backend con token JWT (documento del
// cliente). Mientras tanto se compara contra los usuarios guardados.
// ========================================

export function existeCorreo(correo) {
  const usuarios = leerUsuariosGuardados();
  return usuarios.some(
    (usuario) => usuario.correo.toLowerCase() === correo.trim().toLowerCase()
  );
}

export function autenticarUsuario(correo, contrasena) {
  const usuarios = leerUsuariosGuardados();
  const usuario = usuarios.find(
    (item) =>
      item.correo.toLowerCase() === correo.trim().toLowerCase() &&
      item.contrasena === contrasena
  );

  if (!usuario) return null;

  // Los usuarios del registro público no traen tipoUsuario: son clientes.
  return { correo: usuario.correo, tipoUsuario: usuario.tipoUsuario || "Cliente" };
}
