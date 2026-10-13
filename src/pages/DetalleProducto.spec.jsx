import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DetalleProducto from "./DetalleProducto";
import { actualizarStock } from "../data/productos";

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
  it("muestra el nombre y los datos del producto indicado en la URL", () => {
    renderizarEn("/productos/HM001");

    expect(
      screen.getByRole("heading", { name: /martillo carpintero 500g/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Stanley")).toBeInTheDocument();
  });

  // Detalle 2 — Error: producto inexistente
  it("muestra un mensaje cuando el código no corresponde a un producto", () => {
    renderizarEn("/productos/NOEXISTE");

    expect(
      screen.getByText("El producto solicitado no existe.")
    ).toBeInTheDocument();
  });

  // Detalle 3 — Condicional: sin stock
  it("avisa que no hay stock y deshabilita el botón cuando el stock es 0", () => {
    actualizarStock("HM001", 0);
    renderizarEn("/productos/HM001");

    expect(screen.getByText("Sin stock disponible")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /agregar al carrito/i })
    ).toBeDisabled();
  });
});
