import { vi } from "vitest";
import {
  obtenerPedidos, obtenerPedidoPorNumero, obtenerPedidosPorCorreo,
  crearPedido, registrarPedido, actualizarPedido,
  eliminarPedido, obtenerProductosMasVendidos, obtenerClientesMasFrecuentes
} from "./pedidos";
import { actualizarStock, obtenerProductoPorCodigo } from "./productos";

describe("pedidos data", () => {
  beforeEach(() => { localStorage.clear(); });

  it("crea, obtiene, actualiza y elimina un pedido", () => {
    const nuevo = crearPedido({ numero: "ORD-123", cliente: "Test", clienteCorreo: "test@duoc.cl" });
    expect(nuevo.numero).toBe("ORD-123");

    expect(obtenerPedidos().length).toBe(1);
    expect(obtenerPedidoPorNumero("ORD-123")).not.toBeNull();
    expect(obtenerPedidosPorCorreo("test@duoc.cl").length).toBe(1);
    expect(obtenerPedidoPorNumero("INEXISTENTE")).toBeNull();

    const actualizado = actualizarPedido("ORD-123", { estado: "Listo" });
    expect(actualizado.estado).toBe("Listo");
    expect(actualizarPedido("FALSO", { estado: "X" })).toBeNull();

    expect(eliminarPedido("ORD-123")).toBe(true);
    expect(obtenerPedidos().length).toBe(0);
    expect(eliminarPedido("FALSO")).toBe(false);
  });

  it("genera reportes de productos más vendidos y clientes frecuentes", () => {
    crearPedido({
      numero: "RPT-1", cliente: "Ana", clienteCorreo: "ana@duoc.cl",
      items: [
        { codigo: "P1", nombre: "Prod 1", cantidad: 5, precio: 100 },
        { codigo: "P2", nombre: "Prod 2", cantidad: 2, precio: 50 }
      ]
    });
    crearPedido({
      numero: "RPT-2", cliente: "Ana", clienteCorreo: "ana@duoc.cl",
      items: [{ codigo: "P1", nombre: "Prod 1", cantidad: 3, precio: 100 }]
    });

    const masVendidos = obtenerProductosMasVendidos();
    expect(masVendidos[0].codigo).toBe("P1");
    expect(masVendidos[0].cantidadVendida).toBe(8);

    const clientes = obtenerClientesMasFrecuentes();
    expect(clientes[0].cliente).toBe("Ana");
    expect(clientes[0].totalPedidos).toBe(2);
  });

  it("registrarPedido guarda el pedido y descuenta stock", () => {
    const stockInicial = obtenerProductoPorCodigo("HM001").stock;
    const pedido = registrarPedido({
      cliente: "Juan Pérez", clienteCorreo: "juan@gmail.com", tipoEntrega: "Retiro",
      items: [{ codigo: "HM001", nombre: "Martillo", precio: 7990, cantidad: 2 }],
    });
    expect(pedido.total).toBe(15980);
    expect(obtenerProductoPorCodigo("HM001").stock).toBe(stockInicial - 2);
    actualizarStock("HM001", stockInicial); // Restaurar
  });
});