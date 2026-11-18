import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, vi } from "vitest";
import Catalogo from "./Catalogo";
import { obtenerProductos } from "../data/productos";
import { listarProductos } from "../services/productoService";
import { listarNombresCategorias } from "../services/categoriaService";

// No se llama al backend de verdad: los servicios se reemplazan por datos de prueba
vi.mock("../services/productoService", () => ({ listarProductos: vi.fn() }));
vi.mock("../services/categoriaService", () => ({ listarNombresCategorias: vi.fn() }));

const productos = obtenerProductos();
const categorias = [...new Set(productos.map((producto) => producto.categoria))];

beforeEach(() => {
  listarProductos.mockResolvedValue(productos);
  listarNombresCategorias.mockResolvedValue(categorias);
});

async function renderizar(ruta = "/productos", onAgregarCarrito) {
  const resultado = render(
    <MemoryRouter initialEntries={[ruta]}>
      <Catalogo onAgregarCarrito={onAgregarCarrito} />
    </MemoryRouter>
  );
  // Espera a que lleguen los datos del "backend"
  await screen.findByText(/Mostrando \d+ producto\(s\)\./);
  return resultado;
}

function cantidadDe(categoria) {
  return productos.filter((producto) => producto.categoria === categoria).length;
}

describe("Catalogo", () => {
  // Catálogo 1 — Render: una tarjeta por producto
  it("dibuja una tarjeta por cada producto cuando el filtro está en Todas", async () => {
    const { container } = await renderizar();

    expect(container.querySelectorAll("article").length).toBe(productos.length);
  });

  // Catálogo 2 — Estado: el select cambia la vista
  it("cambia los productos mostrados al elegir una categoría en el select", async () => {
    const usuario = userEvent.setup();
    const { container } = await renderizar();

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
    const { container } = await renderizar();
    const select = screen.getByLabelText(/filtrar por categoría/i);

    await usuario.selectOptions(select, "Pinturas");
    await usuario.selectOptions(select, "Todas");

    expect(container.querySelectorAll("article").length).toBe(productos.length);
  });

  // Catálogo 4 — Buscador: el texto llega por la URL (?q=)
  it("filtra por el texto de búsqueda que viene en la URL", async () => {
    await renderizar("/productos?q=martillo");

    expect(screen.getByText("Mostrando 1 producto(s).")).toBeInTheDocument();
    expect(screen.getByText("Martillo carpintero 500g")).toBeInTheDocument();
  });

  // Catálogo 5 — Props + mock: el Catálogo pasa la función a las tarjetas
  it("entrega a la tarjeta la función recibida por props y la ejecuta con el producto", async () => {
    const usuario = userEvent.setup();
    const onAgregarCarrito = vi.fn();
    await renderizar("/productos", onAgregarCarrito);

    const botones = screen.getAllByText("Agregar al carrito");
    await usuario.click(botones[0]);

    expect(onAgregarCarrito).toHaveBeenCalledWith(productos[0]);
  });

  // Catálogo 6 — Error: si el backend falla se muestra el mensaje
  it("muestra un mensaje de error cuando el backend no responde", async () => {
    listarProductos.mockRejectedValue(new Error("No se pudo conectar con el servidor."));

    render(
      <MemoryRouter initialEntries={["/productos"]}>
        <Catalogo />
      </MemoryRouter>
    );

    expect(
      await screen.findByText("No se pudo conectar con el servidor.")
    ).toBeInTheDocument();
  });
});