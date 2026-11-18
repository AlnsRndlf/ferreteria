import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, vi } from "vitest";
import Pedidos from "./Pedidos";
import { listarPedidos } from "../../services/boletaService";

// No se llama al backend de verdad: el servicio se reemplaza por datos de prueba
vi.mock("../../services/boletaService", () => ({
  listarPedidos: vi.fn(),
  cambiarEstadoPedido: vi.fn(),
}));

const pedidoDePrueba = {
  id: 1,
  numero: "ORDER-1731600000000",
  cliente: "Ana Pérez",
  clienteCorreo: "ana@duoc.cl",
  fecha: "2026-11-17",
  tipoEntrega: "Retiro en tienda",
  estado: "Pendiente",
  total: 5990,
  items: [],
};

function renderizar() {
  return render(
    <MemoryRouter>
      <Pedidos />
    </MemoryRouter>
  );
}

describe("Pedidos (panel)", () => {
  beforeEach(() => {
    listarPedidos.mockReset();
  });

  it("muestra el mensaje de estado vacío cuando todavía no hay pedidos", async () => {
    listarPedidos.mockResolvedValue([]);
    renderizar();

    expect(
      await screen.findByText("Aún no hay pedidos registrados.")
    ).toBeInTheDocument();
  });

  it("lista los pedidos que entrega el backend", async () => {
    listarPedidos.mockResolvedValue([pedidoDePrueba]);
    renderizar();

    expect(await screen.findByText("ORDER-1731600000000")).toBeInTheDocument();
    expect(screen.getByText("Ana Pérez")).toBeInTheDocument();
  });

  it("muestra un mensaje de error si el backend rechaza la petición", async () => {
    listarPedidos.mockRejectedValue(new Error("No tienes permisos para realizar esta acción."));
    renderizar();

    expect(
      await screen.findByText("No tienes permisos para realizar esta acción.")
    ).toBeInTheDocument();
  });
});