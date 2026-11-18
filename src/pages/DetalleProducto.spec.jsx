import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, vi } from "vitest";
import DetalleProducto from "./DetalleProducto";
import { obtenerProductos } from "../data/productos";
import { obtenerProductoPorCodigo } from "../services/productoService";

// No se llama al backend de verdad: el servicio se reemplaza por datos de prueba
vi.mock("../services/productoService", () => ({ obtenerProductoPorCodigo: vi.fn() }));

const martillo = obtenerProductos().find((producto) => producto.codigo === "HM001");

beforeEach(() => {
  obtenerProductoPorCodigo.mockReset();
});

// El código viaja en la URL, igual que en la aplicación real.
function renderizarEn(ruta) {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route path="/productos/:codigo" element={<DetalleProducto />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("DetalleProducto", () => {
  // Detalle 1 — Render con useParams
  it("muestra el nombre y los datos del producto indicado en la URL", async () => {
    obtenerProductoPorCodigo.mockResolvedValue(martillo);
    renderizarEn("/productos/HM001");

    expect(
      await screen.findByRole("heading", { name: /martillo carpintero 500g/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Stanley")).toBeInTheDocument();
    expect(obtenerProductoPorCodigo).toHaveBeenCalledWith("HM001");
  });

  // Detalle 2 — Error: producto inexistente (el servicio devuelve null)
  it("muestra un mensaje cuando el código no corresponde a un producto", async () => {
    obtenerProductoPorCodigo.mockResolvedValue(null);
    renderizarEn("/productos/NOEXISTE");

    expect(
      await screen.findByText("El producto solicitado no existe.")
    ).toBeInTheDocument();
  });

  // Detalle 3 — Condicional: sin stock
  it("avisa que no hay stock y deshabilita el botón cuando el stock es 0", async () => {
    obtenerProductoPorCodigo.mockResolvedValue({ ...martillo, stock: 0 });
    renderizarEn("/productos/HM001");

    expect(await screen.findByText("Sin stock disponible")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /agregar al carrito/i })
    ).toBeDisabled();
  });
});
