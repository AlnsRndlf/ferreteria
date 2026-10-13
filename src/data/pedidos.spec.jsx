import {
  actualizarStock,
  obtenerProductoPorCodigo,
} from "./productos";
import { eliminarPedido, obtenerPedidos, registrarPedido } from "./pedidos";

describe("registrarPedido", () => {
  it("guarda el pedido como Pendiente, calcula el total y descuenta el stock", () => {
    const stockInicial = obtenerProductoPorCodigo("HM001").stock;

    const pedido = registrarPedido({
      cliente: "Juan Pérez",
      clienteCorreo: "juan@gmail.com",
      tipoEntrega: "Retiro en tienda",
      items: [{ codigo: "HM001", nombre: "Martillo", precio: 7990, cantidad: 2 }],
    });

    expect(pedido.total).toBe(15980);
    expect(pedido.estado).toBe("Pendiente");
    expect(obtenerPedidos().length).toBe(1);
    expect(obtenerProductoPorCodigo("HM001").stock).toBe(stockInicial - 2);

    // Se deja todo como estaba para no afectar otras pruebas.
    eliminarPedido(pedido.numero);
    actualizarStock("HM001", stockInicial);
  });
});
