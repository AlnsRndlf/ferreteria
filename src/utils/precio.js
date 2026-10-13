export function formatearMonto(valor) {
  return `$${valor.toLocaleString("es-CL")}`;
}

// Para el precio de un producto: 0 se muestra como "Gratis".
export function formatearPrecio(valor) {
  if (valor === 0) return "Gratis";
  return formatearMonto(valor);
}

// Ofertas (vista "Ofertas" de la Evaluación 2): un producto puede tener
// un descuento en porcentaje (campo opcional "descuento").
export function tieneOferta(producto) {
  return Number(producto.descuento) > 0;
}

export function precioFinal(producto) {
  if (!tieneOferta(producto)) return producto.precio;
  return Math.round(producto.precio * (1 - Number(producto.descuento) / 100));
}