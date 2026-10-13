import { validarRun } from "./validarRun";

describe("validarRun", () => {
  it("acepta un RUN con dígito verificador correcto y rechaza uno incorrecto", () => {
    expect(validarRun("123456785")).toBe(true);
    expect(validarRun("123456780")).toBe(false);
  });
});