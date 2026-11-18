// Guarda la sesión (usuario + token JWT) en sessionStorage.
// Sobrevive a recargar la página, pero se borra al cerrar la pestaña.
const CLAVE = "sesionFerreteria";

export function leerSesion() {
  try {
    const guardado = sessionStorage.getItem(CLAVE);
    return guardado ? JSON.parse(guardado) : null;
  } catch {
    return null;
  }
}

export function guardarSesion(sesion) {
  sessionStorage.setItem(CLAVE, JSON.stringify(sesion));
}

export function borrarSesion() {
  sessionStorage.removeItem(CLAVE);
}

// Un JWT tiene 3 partes separadas por puntos; la del medio trae la fecha de vencimiento (exp)
export function tokenVigente(token) {
  if (!token) return false;
  try {
    const parteCentral = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const { exp } = JSON.parse(atob(parteCentral));
    return exp * 1000 > Date.now();
  } catch {
    return false;
  }
}