import { formatearPrecio, precioFinal } from "./precio";

describe("precio", () => {
  // Prueba 1
  it("muestra el precio 0 como Gratis (el PDF indica que 0 es producto FREE)", () => {
    expect(formatearPrecio(0)).toBe("Gratis");
  });

  // Prueba 13 — vista Ofertas
  it("aplica el porcentaje de descuento y no cambia el precio si no hay oferta", () => {
    expect(precioFinal({ precio: 10000, descuento: 20 })).toBe(8000);
    expect(precioFinal({ precio: 10000 })).toBe(10000);
  });
});