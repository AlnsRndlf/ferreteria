import { guardarDatos, leerDatos } from "../utils/persistencia";
import { actualizarStock, obtenerProductoPorCodigo } from "./productos";

const CLAVE_LOCALSTORAGE = "pedidos";

function leerPedidosGuardados() {
  return leerDatos(CLAVE_LOCALSTORAGE, []);
}

function guardarPedidos(listaPedidos) {
  guardarDatos(CLAVE_LOCALSTORAGE, listaPedidos);
}


// LEER
export function obtenerPedidos() {
  return leerPedidosGuardados();
}

export function obtenerPedidoPorNumero(numero) {
  return leerPedidosGuardados().find((pedido) => pedido.numero === numero) || null;
}

export function obtenerPedidosPorCorreo(correo) {
  return leerPedidosGuardados().filter(
    (pedido) => (pedido.clienteCorreo || "").toLowerCase() === correo.toLowerCase()
  );
}


// CREAR
export function crearPedido(nuevoPedido) {
  const pedidos = leerPedidosGuardados();
  pedidos.push(nuevoPedido);
  guardarPedidos(pedidos);
  return nuevoPedido;
}

// Confirma una compra: crea el pedido y DESCUENTA el stock de cada
// producto (el documento pide que el inventario se actualice al vender).
export function registrarPedido({ cliente, clienteCorreo, tipoEntrega, items }) {
  const total = items.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

  const pedido = crearPedido({
    numero: `ORDER-${Date.now()}`,
    cliente,
    clienteCorreo,
    fecha: new Date().toISOString().slice(0, 10),
    tipoEntrega,
    items,
    total,
    estado: "Pendiente",
  });

  for (const item of items) {
    const producto = obtenerProductoPorCodigo(item.codigo);
    if (producto) {
      actualizarStock(item.codigo, Math.max(0, producto.stock - item.cantidad));
    }
  }

  return pedido;
}


// ACTUALIZAR (ej. cambiar el estado de un pedido)
export function actualizarPedido(numero, datosNuevos) {
  const pedidos = leerPedidosGuardados();
  const indice = pedidos.findIndex((pedido) => pedido.numero === numero);

  if (indice === -1) {
    return null;
  }

  pedidos[indice] = { ...pedidos[indice], ...datosNuevos };
  guardarPedidos(pedidos);
  return pedidos[indice];
}


// ELIMINAR
export function eliminarPedido(numero) {
  const pedidos = leerPedidosGuardados();
  const indice = pedidos.findIndex((pedido) => pedido.numero === numero);

  if (indice === -1) {
    return false;
  }

  pedidos.splice(indice, 1);
  guardarPedidos(pedidos);
  return true;
}


// MÉTRICAS PARA REPORTES
export function obtenerProductosMasVendidos() {
  const conteo = {};

  for (const pedido of leerPedidosGuardados()) {
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

export function obtenerClientesMasFrecuentes() {
  const conteoPorCliente = {};

  for (const pedido of leerPedidosGuardados()) {
    conteoPorCliente[pedido.cliente] = (conteoPorCliente[pedido.cliente] || 0) + 1;
  }

  return Object.keys(conteoPorCliente)
    .map((cliente) => ({ cliente, totalPedidos: conteoPorCliente[cliente] }))
    .sort((a, b) => b.totalPedidos - a.totalPedidos)
    .slice(0, 10);
}
