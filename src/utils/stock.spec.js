import { esStockCritico } from "./stock";

describe("esStockCritico", () => {
  it("es crítico cuando queda stock igual o bajo el mínimo, pero no con 0 ni con stock alto", () => {
    expect(esStockCritico({ stock: 3, stockMinimo: 5 })).toBe(true);
    expect(esStockCritico({ stock: 5, stockMinimo: 5 })).toBe(true);
    expect(esStockCritico({ stock: 0, stockMinimo: 5 })).toBe(false);
    expect(esStockCritico({ stock: 20, stockMinimo: 5 })).toBe(false);
  });
});