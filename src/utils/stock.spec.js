import { esStockCritico, estaSinStock, estadoStock } from "./stock";

describe("stock", () => {
  it("es crítico cuando queda stock igual o bajo el mínimo, pero no con 0 ni con stock alto", () => {
    expect(esStockCritico({ stock: 3, stockMinimo: 5 })).toBe(true);
    expect(esStockCritico({ stock: 5, stockMinimo: 5 })).toBe(true);
    expect(esStockCritico({ stock: 0, stockMinimo: 5 })).toBe(false);
    expect(esStockCritico({ stock: 20, stockMinimo: 5 })).toBe(false);
  });

  it("verifica si el producto está sin stock", () => {
    expect(estaSinStock({ stock: 0 })).toBe(true);
    expect(estaSinStock({ stock: 5 })).toBe(false);
  });

  it("devuelve el estado correcto en formato texto", () => {
    expect(estadoStock({ stock: 0, stockMinimo: 5 })).toBe("Sin stock");
    expect(estadoStock({ stock: 3, stockMinimo: 5 })).toBe("Crítico");
    expect(estadoStock({ stock: 10, stockMinimo: 5 })).toBe("OK");
  });
});