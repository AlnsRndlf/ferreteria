import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Catalogo from "./Catalogo";
import { obtenerProductos } from "../data/productos";

function renderizar(ruta = "/productos", onAgregarCarrito) {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <Catalogo onAgregarCarrito={onAgregarCarrito} />
    </MemoryRouter>
  );
}

function cantidadDe(categoria) {
  return obtenerProductos().filter((producto) => producto.categoria === categoria).length;
}

describe("Catalogo", () => {
  // Catálogo 1 — Render: una tarjeta por producto
  it("dibuja una tarjeta por cada producto cuando el filtro está en Todas", () => {
    const { container } = renderizar();

    expect(container.querySelectorAll("article").length).toBe(obtenerProductos().length);
  });

  // Catálogo 2 — Estado (caso 6 del reparto): el select cambia la vista
  it("cambia los productos mostrados al elegir una categoría en el select", async () => {
    const usuario = userEvent.setup();
    const { container } = renderizar();

    await usuario.selectOptions(
      screen.getByLabelText(/filtrar por categoría/i),
      "Herramientas"
    );

    const esperados = cantidadDe("Herramientas");
    expect(screen.getByText(`Mostrando ${esperados} producto(s).`)).toBeInTheDocument();
    expect(container.querySelectorAll("article").length).toBe(esperados);
  });

  // Catálogo 3 — Estado: volver a Todas restaura la lista
  it("vuelve a mostrar todos los productos al elegir Todas después de filtrar", async () => {
    const usuario = userEvent.setup();
    const { container } = renderizar();
    const select = screen.getByLabelText(/filtrar por categoría/i);

    await usuario.selectOptions(select, "Pinturas");
    await usuario.selectOptions(select, "Todas");

    expect(container.querySelectorAll("article").length).toBe(obtenerProductos().length);
  });

  // Catálogo 4 — Buscador: el texto llega por la URL (?q=)
  it("filtra por el texto de búsqueda que viene en la URL", () => {
    renderizar("/productos?q=martillo");

    expect(screen.getByText("Mostrando 1 producto(s).")).toBeInTheDocument();
    expect(screen.getByText("Martillo carpintero 500g")).toBeInTheDocument();
  });

  // Catálogo 5 — Props + mock: el Catálogo pasa la función a las tarjetas
  it("entrega a la tarjeta la función recibida por props y la ejecuta con el producto", async () => {
    const usuario = userEvent.setup();
    const onAgregarCarrito = vi.fn();
    renderizar("/productos", onAgregarCarrito);

    const botones = screen.getAllByRole("button", { name: /agregar al carrito/i });
    await usuario.click(botones[0]);

    expect(onAgregarCarrito).toHaveBeenCalledWith(obtenerProductos()[0]);
  });
});