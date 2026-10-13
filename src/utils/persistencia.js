export function guardarDatos(clave, datos) {
  localStorage.setItem(clave, JSON.stringify(datos));
}

export function leerDatos(clave, valorPorDefecto) {
  const guardado = localStorage.getItem(clave);
  return guardado === null ? valorPorDefecto : JSON.parse(guardado);
}