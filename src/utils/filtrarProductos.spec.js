import { filtrarProductos } from "./filtrarProductos";

const lista = [
  { codigo: "HM001", nombre: "Martillo carpintero", marca: "Stanley", categoria: "Herramientas" },
  { codigo: "PT001", nombre: "Pintura látex blanca", marca: "Sipa", categoria: "Pinturas" },
  { codigo: "HM003", nombre: "Destornillador plano", marca: "Stanley", categoria: "Herramientas" },
];

describe("filtrarProductos", () => {
  it("filtra por categoría y por texto (nombre, código o marca) sin distinguir mayúsculas", () => {
    expect(filtrarProductos(lista, { categoria: "Herramientas" }).length).toBe(2);
    expect(filtrarProductos(lista, { texto: "SIPA" }).length).toBe(1);
    expect(filtrarProductos(lista, { texto: "hm00" }).length).toBe(2);
    expect(filtrarProductos(lista, { categoria: "Pinturas", texto: "martillo" }).length).toBe(0);
    expect(filtrarProductos(lista).length).toBe(3);
  });
});