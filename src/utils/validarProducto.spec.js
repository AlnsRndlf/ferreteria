import { validarProducto } from "./validarProducto";

describe("validarProducto", () => {
  it("devuelve errores para un producto vacío y ninguno para uno válido", () => {
    const errores = validarProducto({
      codigo: "", nombre: "", descripcion: "", precio: "", stock: "",
      stockMinimo: "", categoria: "",
    });

    expect(errores.codigo).toBe("El código es obligatorio (mínimo 3 caracteres).");
    expect(errores.nombre).toBe("El nombre es obligatorio.");
    expect(errores.categoria).toBe("Selecciona una categoría.");

    const valido = validarProducto({
      codigo: "HM001", nombre: "Martillo", descripcion: "", precio: "7990",
      stock: "20", stockMinimo: "5", categoria: "Herramientas",
    });

    expect(Object.keys(valido).length).toBe(0);
  });
});