import { AUTH_URL } from "../config/api";
import { peticion } from "./http";

// El backend usa ADMIN / VENDEDOR / CLIENTE; el resto de la app usa estos nombres
export const ROL_A_TIPO = {
  ADMIN: "Administrador",
  VENDEDOR: "Vendedor",
  CLIENTE: "Cliente",
};
export const TIPO_A_ROL = Object.fromEntries(
  Object.entries(ROL_A_TIPO).map(([rol, tipo]) => [tipo, rol])
);

function aUsuario(respuesta) {
  return {
    correo: respuesta.correo,
    nombre: respuesta.nombre,
    tipoUsuario: ROL_A_TIPO[respuesta.rol] ?? respuesta.rol,
    token: respuesta.token,
  };
}

export async function login(correo, password) {
  const respuesta = await peticion(AUTH_URL, "/api/v1/auth/login", {
    metodo: "POST",
    cuerpo: { correo, password },
    token: null, // para iniciar sesión no se envía ningún token
  });
  return aUsuario(respuesta);
}

export async function registrarCliente({
  run, nombre, apellidos, correo, password, region, comuna, direccion,
}) {
  return peticion(AUTH_URL, "/api/v1/auth/registro", {
    metodo: "POST",
    cuerpo: { run, nombre, apellidos, correo, password, region, comuna, direccion },
    token: null,
  });
}

// Pide un token nuevo usando el que está guardado en la sesión
export async function refrescar() {
  const respuesta = await peticion(AUTH_URL, "/api/v1/auth/refresh", { metodo: "POST" });
  return aUsuario(respuesta);
}
