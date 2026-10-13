export function estaSinStock(producto) {
  return producto.stock === 0;
}

// Crítico = queda stock, pero igual o por debajo del mínimo (punto de
// reposición que pide el documento del cliente).
export function esStockCritico(producto) {
  return producto.stock > 0 && producto.stock <= producto.stockMinimo;
}

export function estadoStock(producto) {
  if (estaSinStock(producto)) return "Sin stock";
  if (esStockCritico(producto)) return "Crítico";
  return "OK";
}