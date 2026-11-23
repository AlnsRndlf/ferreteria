import { API_URL } from "../config/api";
import { ErrorApi, peticion } from "./http";
import { obtenerProductoPorCodigo } from "./productoService";

// El backend usa códigos (PENDIENTE, RETIRO...); las pantallas usan textos legibles.
const ESTADO_A_TEXTO = {
  PENDIENTE: "Pendiente",
  EN_PREPARACION: "En preparación",
  LISTO: "Listo",
  ENTREGADO: "Entregado",
};
const ENTREGA_A_TEXTO = {
  RETIRO: "Retiro en tienda",
  DESPACHO: "Despacho a domicilio",
};

function invertir(objeto) {
  return Object.fromEntries(Object.entries(objeto).map(([clave, valor]) => [valor, clave]));
}
const TEXTO_A_ESTADO = invertir(ESTADO_A_TEXTO);
const TEXTO_A_ENTREGA = invertir(ENTREGA_A_TEXTO);

// Convierte la boleta del backend en el "pedido" que usan las pantallas
export function aPedido(boleta) {
  return {
    id: boleta.id,
    numero: boleta.numero,
    cliente: boleta.clienteNombre || boleta.clienteCorreo,
    clienteCorreo: boleta.clienteCorreo,
    fecha: boleta.fecha.slice(0, 10),
    tipoEntrega: ENTREGA_A_TEXTO[boleta.tipoEntrega] ?? boleta.tipoEntrega,
    estado: ESTADO_A_TEXTO[boleta.estado] ?? boleta.estado,
    total: boleta.total,
    items: boleta.detalles.map((detalle) => ({
      codigo: detalle.productoCodigo,
      nombre: detalle.productoNombre,
      precio: detalle.precioUnitario,
      cantidad: detalle.cantidad,
    })),
  };
}

// Solo ADMIN y VENDEDOR
export async function listarPedidos() {
  const lista = await peticion(API_URL, "/api/v1/boletas");
  return lista.map(aPedido);
}

// Las de un cliente según su correo (solo ADMIN, para el historial de compras)
export async function listarPedidosPorCorreo(correo) {
  const lista = await peticion(
    API_URL,
    `/api/v1/boletas/por-cliente?correo=${encodeURIComponent(correo)}`
  );
  return lista.map(aPedido);
}

// Las del usuario que inició sesión
export async function listarMisPedidos() {
  const lista = await peticion(API_URL, "/api/v1/boletas/mias");
  return lista.map(aPedido);
}

// Devuelve null si no existe (404)
export async function obtenerPedidoPorNumero(numero) {
  try {
    const boleta = await peticion(API_URL, `/api/v1/boletas/numero/${encodeURIComponent(numero)}`);
    return aPedido(boleta);
  } catch (error) {
    if (error.status === 404) return null;
    throw error;
  }
}

// items: [{ id?, codigo, cantidad }]. El backend valida el stock, calcula los precios
// y el total, y descuenta el stock; aquí solo se envía qué se compra y cuánto.
export async function crearPedido({ tipoEntrega, items }) {
  const detalle = await Promise.all(
    items.map(async (item) => {
      let productoId = item.id;
      if (!productoId) {
        // Carritos guardados antes de esta versión no traen el id del producto
        const producto = await obtenerProductoPorCodigo(item.codigo);
        if (!producto) throw new ErrorApi(`El producto ${item.codigo} ya no existe.`, 404);
        productoId = producto.id;
      }
      return { productoId, cantidad: item.cantidad };
    })
  );

  const boleta = await peticion(API_URL, "/api/v1/boletas", {
    metodo: "POST",
    cuerpo: { tipoEntrega: TEXTO_A_ENTREGA[tipoEntrega], items: detalle },
  });
  return aPedido(boleta);
}

export async function cambiarEstadoPedido(id, estadoTexto) {
  const boleta = await peticion(API_URL, `/api/v1/boletas/${id}/estado`, {
    metodo: "PUT",
    cuerpo: { estado: TEXTO_A_ESTADO[estadoTexto] },
  });
  return aPedido(boleta);
}
