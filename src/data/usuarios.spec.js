import {
  obtenerUsuarios, obtenerUsuarioPorRun, crearUsuario,
  actualizarUsuario, eliminarUsuario, existeCorreo, autenticarUsuario
} from "./usuarios";

describe("usuarios data", () => {
  beforeEach(() => { localStorage.clear(); });

  it("gestiona el CRUD completo de usuarios y la autenticación", () => {
    const user = { run: "111-1", correo: "test@duoc.cl", contrasena: "1234", tipoUsuario: "Cliente" };
    crearUsuario(user);

    expect(obtenerUsuarios().length).toBe(1);
    expect(obtenerUsuarioPorRun("111-1")).not.toBeNull();
    expect(obtenerUsuarioPorRun("222-2")).toBeNull();

    const actualizado = actualizarUsuario("111-1", { nombre: "Test" });
    expect(actualizado.nombre).toBe("Test");
    expect(actualizarUsuario("X", {})).toBeNull();

    expect(existeCorreo("test@duoc.cl")).toBe(true);
    expect(existeCorreo("falso@duoc.cl")).toBe(false);

    const auth = autenticarUsuario("test@duoc.cl", "1234");
    expect(auth.correo).toBe("test@duoc.cl");
    expect(autenticarUsuario("test@duoc.cl", "mal")).toBeNull();

    expect(eliminarUsuario("111-1")).toBe(true);
    expect(eliminarUsuario("X")).toBe(false);
  });
});