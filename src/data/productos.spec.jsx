import { vi } from "vitest";
import {
  crearProducto,
  eliminarProducto,
  obtenerProductoPorCodigo,
  productos,
} from "./productos";

describe("persistencia de productos", () => {
  it("guarda el catálogo serializado en localStorage al crear un producto", () => {
    const espia = vi.spyOn(Storage.prototype, "setItem");
    const nuevo = {
      codigo: "TEST01",
      categoria: "Herramientas",
      nombre: "Producto de prueba",
      marca: "Marca",
      unidad: "Unidad",
      precio: 1000,
      stock: 5,
      stockMinimo: 1,
      imagen: null,
    };

    crearProducto(nuevo);

    expect(espia).toHaveBeenCalledWith("productos", JSON.stringify(productos));
    expect(obtenerProductoPorCodigo("TEST01")).not.toBeNull();

    // Se deja el catálogo como estaba para no afectar otras pruebas.
    eliminarProducto("TEST01");
    espia.mockRestore();
  });
});
