import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import TarjetaProducto from "./TarjetaProducto";

const productoBase = {
  codigo: "HM001",
  categoria: "Herramientas",
  nombre: "Martillo carpintero 500g",
  marca: "Stanley",
  unidad: "Unidad",
  precio: 7990,
  stock: 20,
  stockMinimo: 5,
  imagen: null,
};

// La tarjeta usa <Link>, que necesita un Router alrededor.
function renderizar(producto, onAgregarCarrito = vi.fn()) {
  return render(
    <MemoryRouter>
      <TarjetaProducto producto={producto} onAgregarCarrito={onAgregarCarrito} />
    </MemoryRouter>
  );
}

describe("TarjetaProducto", () => {
  // Tarjeta 1 — caso 4 del reparto: renderiza el nombre recibido por props
  it("renderiza el nombre, la categoría y el precio recibidos por props", () => {
    renderizar(productoBase);

    expect(screen.getByText("Martillo carpintero 500g")).toBeInTheDocument();
    expect(screen.getByText("Herramientas")).toBeInTheDocument();
    expect(screen.getByText("$7.990")).toBeInTheDocument();
  });

  // Tarjeta 2 — caso 5 del reparto: alerta si el stock es crítico
  it("muestra la alerta de últimas unidades cuando el stock es crítico", () => {
    renderizar({ ...productoBase, stock: 3, stockMinimo: 5 });

    expect(screen.getByText(/últimas 3 unidades/i)).toBeInTheDocument();
  });

  // Tarjeta 3 — el caso contrario: sin alerta cuando el stock es alto
  it("no muestra la alerta cuando el stock es suficiente", () => {
    renderizar(productoBase);

    expect(screen.queryByText(/últimas/i)).toBeNull();
  });

  // Tarjeta 4 — condicional: sin stock
  it("deshabilita el botón de agregar cuando el producto no tiene stock", () => {
    renderizar({ ...productoBase, stock: 0 });

    expect(
      screen.getByRole("button", { name: /agregar al carrito/i })
    ).toBeDisabled();
  });

  // Tarjeta 5 — evento con mock (vi.fn)
  it("ejecuta onAgregarCarrito con el producto al hacer clic en el botón", async () => {
    const usuario = userEvent.setup();
    const onAgregarCarrito = vi.fn();
    renderizar(productoBase, onAgregarCarrito);

    await usuario.click(
      screen.getByRole("button", { name: /agregar al carrito/i })
    );

    expect(onAgregarCarrito).toHaveBeenCalledWith(productoBase);
  });

  // Tarjeta 6 — props de oferta: precio normal tachado y precio con descuento
  it("muestra el precio original, el precio con descuento y el porcentaje cuando hay oferta", () => {
    renderizar({ ...productoBase, precio: 10000, descuento: 20 });

    expect(screen.getByText("$10.000")).toBeInTheDocument();
    expect(screen.getByText("$8.000")).toBeInTheDocument();
    expect(screen.getByText("-20%")).toBeInTheDocument();
  });
});
