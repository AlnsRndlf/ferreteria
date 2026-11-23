import { AUTH_URL } from "../config/api";
import { ROL_A_TIPO, TIPO_A_ROL } from "./authService";
import { peticion } from "./http";

// Convierte el usuario del backend en el que usan las pantallas
function aUsuario(u) {
  return {
    id: u.id,
    run: u.run ?? "",
    nombre: u.nombre,
    apellidos: u.apellidos ?? "",
    correo: u.correo,
    region: u.region ?? "",
    comuna: u.comuna ?? "",
    direccion: u.direccion ?? "",
    tipoUsuario: ROL_A_TIPO[u.rol] ?? u.rol,
  };
}

// Convierte los datos del formulario en lo que espera el backend
function aSolicitud(d) {
  return {
    run: d.run.trim(),
    nombre: d.nombre.trim(),
    apellidos: d.apellidos.trim(),
    correo: d.correo.trim(),
    password: d.password ? d.password : null, // vacía = no cambiarla (al editar)
    region: d.region,
    comuna: d.comuna,
    direccion: d.direccion.trim(),
    rol: TIPO_A_ROL[d.tipoUsuario],
  };
}

// Solo ADMIN
export async function listarUsuarios() {
  const lista = await peticion(AUTH_URL, "/api/v1/usuarios");
  return lista.map(aUsuario);
}

export async function obtenerUsuario(id) {
  return aUsuario(await peticion(AUTH_URL, `/api/v1/usuarios/${id}`));
}

export async function crearUsuario(datos) {
  const creado = await peticion(AUTH_URL, "/api/v1/usuarios", {
    metodo: "POST",
    cuerpo: aSolicitud(datos),
  });
  return aUsuario(creado);
}

export async function actualizarUsuario(id, datos) {
  const actualizado = await peticion(AUTH_URL, `/api/v1/usuarios/${id}`, {
    metodo: "PUT",
    cuerpo: aSolicitud(datos),
  });
  return aUsuario(actualizado);
}

export function eliminarUsuario(id) {
  return peticion(AUTH_URL, `/api/v1/usuarios/${id}`, { metodo: "DELETE" });
}

// Los datos del usuario que inició sesión (cualquier rol)
export async function obtenerPerfil() {
  return aUsuario(await peticion(AUTH_URL, "/api/v1/auth/perfil"));
}
