import { formatearMonto, formatearPrecio, precioFinal } from "./precio";

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

  // Prueba 24 — el formato no depende del idioma del computador
  it("separa los miles con punto, igual en cualquier computador", () => {
    expect(formatearMonto(7990)).toBe("$7.990");
    expect(formatearMonto(1234567)).toBe("$1.234.567");
    expect(formatearMonto(0)).toBe("$0");
  });
});