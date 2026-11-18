import { borrarSesion, leerSesion } from "./sesion";

export class ErrorApi extends Error {
  constructor(mensaje, status) {
    super(mensaje);
    this.status = status;
  }
}

function mensajePorEstado(status) {
  if (status === 401) return "Tu sesión expiró o no es válida. Inicia sesión nuevamente.";
  if (status === 403) return "No tienes permisos para realizar esta acción.";
  if (status === 404) return "No se encontró lo que buscabas.";
  return "Ocurrió un error en el servidor.";
}

// Función única para hablar con los backends.
// - Agrega solo el encabezado "Authorization: Bearer <token>"
// - Convierte los errores del backend ({ "error": "..." }) en un ErrorApi legible
// - Si el backend responde 401 teniendo sesión, la cierra
export async function peticion(base, ruta, { metodo = "GET", cuerpo, token } = {}) {
  const tokenUsado = token === undefined ? leerSesion()?.token : token;

  const encabezados = {};
  if (cuerpo !== undefined) encabezados["Content-Type"] = "application/json";
  if (tokenUsado) encabezados.Authorization = `Bearer ${tokenUsado}`;

  let respuesta;
  try {
    respuesta = await fetch(`${base}${ruta}`, {
      method: metodo,
      headers: encabezados,
      body: cuerpo !== undefined ? JSON.stringify(cuerpo) : undefined,
    });
  } catch {
    throw new ErrorApi("No se pudo conectar con el servidor.", 0);
  }

  if (respuesta.status === 204) return null;

  let datos = null;
  try {
    datos = await respuesta.json();
  } catch {
    // respuesta sin cuerpo
  }

  if (!respuesta.ok) {
    if (respuesta.status === 401 && tokenUsado) {
      borrarSesion();
      window.dispatchEvent(new Event("sesion-expirada"));
    }
    throw new ErrorApi(datos?.error ?? mensajePorEstado(respuesta.status), respuesta.status);
  }

  return datos;
}