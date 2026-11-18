import { AUTH_URL } from "../config/api";
import { peticion } from "./http";

// El backend usa ADMIN / VENDEDOR / CLIENTE; el resto de la app usa estos nombres
const ROL_A_TIPO = {
  ADMIN: "Administrador",
  VENDEDOR: "Vendedor",
  CLIENTE: "Cliente",
};

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

export async function registrarCliente({ nombre, correo, password }) {
  return peticion(AUTH_URL, "/api/v1/auth/registro", {
    metodo: "POST",
    cuerpo: { nombre, correo, password },
    token: null,
  });
}

// Pide un token nuevo usando el que está guardado en la sesión
export async function refrescar() {
  const respuesta = await peticion(AUTH_URL, "/api/v1/auth/refresh", { metodo: "POST" });
  return aUsuario(respuesta);
}
