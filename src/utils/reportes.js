// Cálculos de los reportes a partir de la lista de pedidos que entrega el backend

export function productosMasVendidos(pedidos) {
  const conteo = {};

  for (const pedido of pedidos) {
    for (const item of pedido.items || []) {
      if (!conteo[item.codigo]) {
        conteo[item.codigo] = { codigo: item.codigo, nombre: item.nombre, cantidadVendida: 0 };
      }
      conteo[item.codigo].cantidadVendida += item.cantidad;
    }
  }

  return Object.values(conteo)
    .sort((a, b) => b.cantidadVendida - a.cantidadVendida)
    .slice(0, 10);
}

export function clientesMasFrecuentes(pedidos) {
  const conteo = {};

  for (const pedido of pedidos) {
    conteo[pedido.cliente] = (conteo[pedido.cliente] || 0) + 1;
  }

  return Object.keys(conteo)
    .map((cliente) => ({ cliente, totalPedidos: conteo[cliente] }))
    .sort((a, b) => b.totalPedidos - a.totalPedidos)
    .slice(0, 10);
}